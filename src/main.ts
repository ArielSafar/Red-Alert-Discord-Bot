import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ITransporterOptions } from '@sick/logger';
import * as pkg from '../package.json';
import { AppModule } from './app.module';
import { Config } from '@sick/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const env = app.get(ConfigService);

	const config = await Config.init(pkg.name, env.get<string>('NODE_ENV'), env.get<string>('CONFIG_SERVER_URL'));

	app.useLogger(new Logger(config.get<ITransporterOptions[]>('LOGGER.TRANSPORTERS')));

	const swaggerOptions = new DocumentBuilder()
		.setTitle(pkg.name)
		.setDescription(pkg.description)
		.setVersion(pkg.version)
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

	SwaggerModule.setup('swagger', app, swaggerDocument);

	await app.listen(env.get<number>('PORT') || config.get<number>('PORT'));
}

bootstrap();
