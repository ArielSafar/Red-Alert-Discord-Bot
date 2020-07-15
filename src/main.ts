import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ITransporterOptions } from '@sick/logger';
import { Config } from '@sick/config';
import * as pkg from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(Config);
	const logger = app.get(Logger);

	await config.init(pkg.name);

	logger.init(config.get<ITransporterOptions[]>('LOGGER.TRANSPORTERS'));
	app.useLogger(logger);

	const swaggerOptions = new DocumentBuilder()
		.setTitle(pkg.name)
		.setDescription(pkg.description)
		.setVersion(pkg.version)
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('swagger', app, swaggerDocument);

	await app.listen(config.get<number>('PORT'));
}

bootstrap();
