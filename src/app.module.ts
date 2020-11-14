import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@sick/config';
import { LoggerModule } from '@sick/logger';
import { FeedModule } from './feed/feed.module';
import { DatabaseModule } from '@sick/typeorm';

@Module({
	imports: [ConfigModule, LoggerModule, TerminusModule, FeedModule, DatabaseModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
