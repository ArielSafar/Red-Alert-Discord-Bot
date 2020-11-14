import { Module } from '@nestjs/common';
import { ConfigModule } from '@sick/config';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { DatabaseModule } from '@sick/typeorm';
import { LoggerModule } from '@sick/logger';

@Module({
	imports: [ConfigModule, DatabaseModule, LoggerModule],
	controllers: [FeedController],
	providers: [FeedService],
})
export class FeedModule {}
