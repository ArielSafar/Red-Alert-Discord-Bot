import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../package.json';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerOptions = new DocumentBuilder()
		.setTitle(pkg.name)
		.setDescription(pkg.description)
		.setVersion(pkg.version)
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

	SwaggerModule.setup('swagger', app, swaggerDocument);

	await app.listen(3000);
}

bootstrap();
