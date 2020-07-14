import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ExampleModule } from './example/example.module';
import { ConfigModule } from '@sick/config';

@Module({
	imports: [ConfigModule, TerminusModule, ExampleModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
