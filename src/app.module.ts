import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedAlertModule } from './feed/red-alert.module';

@Module({
	imports: [RedAlertModule, ConfigModule.forRoot()],
	controllers: [],
	providers: [],
})
export class AppModule {}
