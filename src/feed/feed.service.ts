import { Injectable } from '@nestjs/common';
import { Database, Event as Events } from '@sick/typeorm';
import { Event } from './models/event.model';

@Injectable()
export class FeedService {
	constructor(private database: Database) {}
	public async insertBulkToDB(events: Event[]) {
		events = this.attachInsertionTimeToEvents(events);

		const dbResponse = await this.database
			.getConnection()
			.getRepository(Events)
			.save(events);

		return dbResponse;
	}

	private attachInsertionTimeToEvents(events: Event[]) {
		events.forEach(event => {
			event.insertionTime = new Date().toISOString();
		});

		return events;
	}
}
