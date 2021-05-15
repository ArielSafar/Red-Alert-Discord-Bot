import { Injectable } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js';
import { Alert } from 'src/types';
import * as moment from 'moment';
import * as areaTimes from '../area-times.json';

@Injectable()
export class DiscordService {
	private bot: Client;
	private channel: TextChannel;

	constructor() {
		this.bot = null;
		this.channel = null;
	}

	public start(token: string): void {
		this.bot = new Client();
		this.bot.login(token);

		this.bot.on('ready', () => {
			this.channel = this.bot.channels.cache.find((channel: TextChannel) => channel.name === 'red-alert') as TextChannel;
		});
	}

	private async send(message: string, time: number) {
		const msg = await this.channel.send(message + ` - ${time} שניות`);

		for (let i = 0; i < time - 1; i += 5) {
			setTimeout(() => {
				msg.edit(message + ` - ${time - i} שניות`);
			}, i * 1000);
		}
	}

	public sendAlert(alert: Alert) {
		const { time } = areaTimes.find(area => alert.areas[0].includes(area.name.trim())) as { time: number };

		this.send(this.formatAlertMessage(alert), time);
	}

	private formatAlertMessage(alert: Alert) {
		return `${moment(alert.timestamp).format('DD/MM/yyyy, h:mm:ss a')} - אזעקת צבע אדום: \n\n ${alert.areas.join('\n')}`;
	}
}
