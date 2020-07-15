import { ConfigModule } from '@sick/config';
import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleResolver } from './example.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        ConfigModule,
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
    controllers: [
        ExampleController
    ],
    providers: [
        ExampleService,
        ExampleResolver
    ]
})
export class ExampleModule { }
