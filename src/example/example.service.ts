import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Example } from './models/example.model';
import { Config } from '@sick/config';

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
	constructor(private config: Config) {}

	async getExample(id: number) {
		const example = this.config.get('example');
		if (example) {
			const foundExample = this.examples.find(example => example.id == id);
			if (foundExample) {
				return foundExample;
			} else {
				throw new NotFoundException('no example found for given id');
			}
		} else {
			return this.specialExample;
		}
	}
}
