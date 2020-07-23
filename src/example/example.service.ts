import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Example } from './models/example.model';
import { Config } from '@sick/config';
import { Logger } from '@sick/logger';
import { RequestStorage } from '@sick/request-storage';

@Injectable()
export class ExampleService {
	private examples: Example[] = [
		{
			id: 0,
			name: 'first example',
		},
		{
			id: 1,
			name: 'second example',
		},
	];
	private specialExample: Example = {
		id: 30,
		name: 'very special',
	};
	constructor(private config: Config, private logger: Logger) {}

	async getExample(id: number) {
		const example = this.config.get('example');
		this.logger.log(`example value in config is: ${example}`);
		this.logger.log(`this is the request's guid from the RequestStorage: ${RequestStorage.currentRequest().guid}`)
		if (example) {
			const foundExample = this.examples.find(example => example.id == id);
			if (foundExample) {
				return foundExample;
			} else {
				this.logger.error(`examlpe not found`);
				throw new NotFoundException('no example found for given id');
			}
		} else {
			return this.specialExample;
		}
	}
}
