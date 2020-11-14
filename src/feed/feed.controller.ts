import { Injectable } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Config } from '@sick/config';
import { FeedService } from './feed.service';
import { Event } from './models/event.model';
import { Logger } from '@sick/logger';

type InternalQueueMessage = { content: Event; originalMessage: Record<string, any> };

@Injectable()
export class FeedController {
	private messages: InternalQueueMessage[];
	private timeoutId: NodeJS.Timeout;
	private isInsertionInProgress: boolean;

	constructor(private config: Config, private feedService: FeedService, private logger: Logger) {
		this.messages = [];
		this.timeoutId = null;
		this.isInsertionInProgress = false;
	}

	@MessagePattern('sick-feed')
	public async dequeueToInternalQueue(@Payload() content: Event, @Ctx() context: RmqContext) {
		const [channel, originalMessage] = [context.getChannelRef(), context.getMessage()];

		this.messages.push({ content, originalMessage });

		if (this.isInternalQueueFull()) {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = null;
			}

			if (!this.isInsertionInProgress) {
				await this.handleBulkEvents(channel);
			}
		} else if (!this.timeoutId) {
			this.timeoutId = setTimeout(async () => {
				await this.handleBulkEvents(channel);
				this.timeoutId = null;
			}, this.config.get<number>('RABBITMQ.FEED.OPTIONS.FLUSH_INTERVAL'));
		}
	}

	private async handleBulkEvents(channel: any) {
		this.isInsertionInProgress = true;
		const messagesContent = this.extractContent(this.messages);

		try {
			const response = await this.feedService.insertBulkToDB(messagesContent);

			this.sendAckToQueue(messagesContent, 'ack', channel);

			this.logger.info('Events inserted successfully to SQL Server, and the Rabbitmq has been acknowledged', { eventCount: response.length });
		} catch (err) {
			this.logger.error('Error while handeling events. Sending nack for messages', err);

			this.sendAckToQueue(messagesContent, 'nack', channel);
		} finally {
			this.isInsertionInProgress = false;
		}
	}

	private sendAckToQueue(messages: Event[], status: 'ack' | 'nack', channel: any) {
		let originalMessage = null;

		for (const message of messages) {
			try {
				originalMessage = this.getOriginalMessageByMessageId(message.id);
				channel[status](originalMessage);
				this.removeMessageFromInternalQueue(message.id);
			} catch (err) {
				this.logger.error(`Error while sending ${status} for message ${message.id}`, err);
			}
		}
	}

	private extractContent(messages: InternalQueueMessage[]) {
		return messages.map(message => message.content);
	}

	private getOriginalMessageByMessageId(messageId: string) {
		return this.messages.find(message => message.content.id === messageId).originalMessage;
	}

	private removeMessageFromInternalQueue(messageId: string) {
		const index = this.messages.findIndex(message => message.content.id === messageId);
		this.messages.splice(index, 1);
	}

	private isInternalQueueFull() {
		return this.messages.length >= this.config.get<number>('RABBITMQ.FEED.OPTIONS.INTERNAL_QUEUE_SIZE');
	}
}
