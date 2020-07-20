import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ExampleModule } from './example/example.module';
import { ConfigModule } from '@sick/config';
import { LoggerModule } from '@sick/logger';
import { AuthenticationModule } from '@sick/authentication';

@Module({
	imports: [ConfigModule, LoggerModule, AuthenticationModule, TerminusModule, ExampleModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
