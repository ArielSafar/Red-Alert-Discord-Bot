import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { ExampleModule } from './example/example.module';

@Module({
	imports: [TerminusModule, ExampleModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
