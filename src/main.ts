import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Config } from '@sick/config';
import { ITransporterOptions, Logger } from '@sick/logger';
import { Database } from '@sick/typeorm';
import * as pkg from '../package.json';
import { AppModule } from './app.module';

function getRMQUrls(urls: string[], username: string, password: string, port: number) {
	return urls.map(host => `amqp://${username}:${password}@${host}:${port}`);
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(Config);
	await config.init(pkg.name);

	app.get(Logger).init(config.get<ITransporterOptions[]>('LOGGER.TRANSPORTERS'));

	const microservice = app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: getRMQUrls(
				config.get<string[]>('RABBITMQ.HOSTS'),
				config.get<string>('RABBITMQ.USERNAME'),
				config.get<string>('RABBITMQ.PASSWORD'),
				config.get<number>('RABBITMQ.PORT', 5672)
			),
			queue: config.get<string>('RABBITMQ.FEED.QUEUE'),
			noAck: false,
			prefetchCount: config.get<string>('RABBITMQ.FEED.OPTIONS.INTERNAL_QUEUE_SIZE'),
			queueOptions: {
				durable: true,
			},
		},
	});

	await microservice
		.get(Database)
		.connect(
			config.get<string>('MSSQL.HOST'),
			config.get<string>('MSSQL.USERNAME'),
			config.get<string>('MSSQL.PASSWORD'),
			config.get<string>('MSSQL.DATABASE')
		);

	await microservice.listen(() => {
		console.log('Start listening for events...');
	});
}

bootstrap();
