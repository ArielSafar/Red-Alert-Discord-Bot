import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscordService } from 'src/discord/discord.service';
import { Alert } from 'src/types';
import * as WebSocket from 'ws';

@Injectable()
export class RedAlertService {
	private ws: WebSocket;
	private discordService: DiscordService;

	constructor(discordService: DiscordService, config: ConfigService) {
		this.ws = new WebSocket(config.get<string>('WS_CONNECTION_STRING')); // This should be: ws://ws.cumta.morhaviv.com:25565/ws
		this.discordService = discordService;

		this.ws.on('message', message => {
			const alert = this.formatMessage(message);

			this.discordService.sendAlert(alert);
		});

		this.ws.on('error', function(error) {
			console.error(error);
		});
	}

	private formatMessage = (message: WebSocket.Data): Alert => {
		const areas = JSON.parse(message.toString()).areas.split(', ');

		const alert: Alert = { areas, timestamp: Date.now() };

		return alert;
	};
}
