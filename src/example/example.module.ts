import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleResolver } from './example.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@sick/config';
import { LoggerModule } from '@sick/logger';
import { AuthenticationModule } from '@sick/authentication';

@Module({
	imports: [
		ConfigModule,
		LoggerModule,
		AuthenticationModule,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			playground: true,
			introspection: true,
			context: ({ req }) => {
				return {
					request: req,
				};
			},
		}),
	],
	controllers: [ExampleController],
	providers: [ExampleService, ExampleResolver],
})
export class ExampleModule {}
