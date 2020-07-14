import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ITransporterOptions } from '@sick/logger';
import { Config } from '@sick/config';
import * as pkg from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(Config);

	await config.init(pkg.name);

	app.useLogger(new Logger(config.get<ITransporterOptions[]>('LOGGER.TRANSPORTERS')));

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
