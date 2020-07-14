import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ExampleController } from './example/example.controller';
import { ExampleModule } from './example/example.module';
import { ExampleService } from './example/example.service';
import { ConfigModule } from '@sick/config';

@Module({
	imports: [ConfigModule, TerminusModule, ExampleModule],
	controllers: [ExampleController],
	providers: [ExampleService],
})
export class AppModule { }
