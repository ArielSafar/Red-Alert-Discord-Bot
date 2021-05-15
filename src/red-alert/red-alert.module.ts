import { Module } from '@nestjs/common';
import { RedAlertService } from './red-alert.service';
import { DiscordModule } from '../discord/discord.module';

@Module({
	imports: [DiscordModule],
	controllers: [],
	providers: [RedAlertService],
})
export class RedAlertModule {}
