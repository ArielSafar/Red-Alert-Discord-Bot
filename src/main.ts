import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DiscordService } from './discord/discord.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const discordService = app.get(DiscordService);

	discordService.start(config.get<string>('DISCORD_BOT_TOKEN'));

	await app.listen(3000, () => {
		console.log('Start listening for events...');
	});
}

bootstrap();
