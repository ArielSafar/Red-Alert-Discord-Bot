# Welcome to Sick Feed Worker

**This service is subscribed to events from RabbitMQ and insert them to SQL Server.**

## Recommendations

There's been a lot of work on this seed to be well integrated with VSCode. If you want to have the best development experience, you should download these extensions:

-   ESLint
-   Prettier

Because this app was created with nestjs, it will follow nestjs guidelines for file structure.

## Installation

```bash
$ npm install
```

## Configuration

Before starting the app you should set the `.env` file correctly, with the same format as the `.env.example` file.

| Configuration Parameter                     | Type     | Description                                                                     |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `RABBITMQ.HOSTS`                            | string[] | The hosts of the RabbitMQ Cluster                                               |
| `RABBITMQ.USERNAME`                         | string   | Username for the RabbitMQ                                                       |
| `RABBITMQ.PASSWORD`                         | string   | Password for the RabbitMQ                                                       |
| `RABBITMQ.PORT`                             | number   | Port of the RabbitMQ (default: `5672`)                                          |
| `RABBITMQ.FEED.QUEUE`                       | string   | Name of the queue that the worker will read from                                |
| `RABBITMQ.FEED.OPTIONS.INTERNAL_QUEUE_SIZE` | number   | The maximum number for messages to be processed at once. (min: `1`, max: `200`) |
| `RABBITMQ.FEED.OPTIONS.FLUSH_INTERVAL`      | number   | Flushing interval to the SQL Server in [ms]                                     |
| `MSSQL.HOST`                                | string   | Host for SQL Server                                                             |
| `MSSQL.USERNAME`                            | string   | Username for SQL Server                                                         |
| `MSSQL.PASSWORD`                            | string   | Password for SQL Server                                                         |
| `MSSQL.DATABASE`                            | string   | Database name                                                                   |
| `LOGGER.TRANSPORTERS`                       | string[] | Logger transporters. For more information please look at `@sick/logger`         |

## Before Running the app

Before starting the app you should set the `.env` file correctly, with the same format as the `.env.example` file.

| Environemt Variable | Required | Description                                                                      |
| ------------------- | -------- | -------------------------------------------------------------------------------- |
| `NODE_ENV`          | yes      | Tell the config server which environment you want to run (production / test ...) |
| `CONFIG_SERVER_URL` | yes      | The URL of the config server                                                     |

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Resources

-   `resourceName.controller.ts` - Makes the first contact with the resource. Will contain the translation from the API to our service.
-   `resourceName.service.ts` - Will contain all of our logic.
-   `resourceName.module.ts` - Modules are what combining the services to controllers. It will hold all the configuration for a route.
-   `resourceName.dto.ts` - (optional) Will hold any specific types for the resource such as query/params/headers/body.

Resource will be in a folder inside `./src/`, and their modules will be imported to `./src/app.modules.ts`.
There's could be more files added to a resource such as specific types for headers/body, those will be added to the file.

### Common

Here we hold anything that is not resource-specific. Stuff that is currently in there:

-   `logging.interceptor.ts` - Intercept every resource that you put about the class. This is the component that will log the request/response.

This folder can be used for service-specific handlers, or stuff used by many services (which in that case you should make MR to this seed).

Feel free to add things that belong to the template, like middlewares, guards, common types, etc.

## How to add new resource?

To create a new resource, you'll need to generate 3 files:

```bash
$ nest generate module <resourceName>
$ nest generate controller <resourceName>
$ nest generate service <resourceName>
```

Make sure that the new module is referenced on `app.module.ts` as well.

## How do I build?

To build the app, simply run:

```bash
$ npm run build
```

This will create `./dist` folder in the project root. Then run

```bash
$ npm run start:prod
```

To start local instance of the production server.

In order to build docker image, run

```bash
$ docker build .
```

The docker image will export the app on port 80, so it is important to make sure that the configuration will have the same port open to expose the app. Only the `./dist` folder will be uploaded to the docker image! make sure that you run `$ npm run build` to create the latest version of the files (and that every config file you added is inside it).
