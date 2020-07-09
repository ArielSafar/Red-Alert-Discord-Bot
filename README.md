# Welcome to Sick Seed Service

**This README will not help you with nestjs, only the conventions of this app. For more information about nestjs, visit http://docs.nestjs.io/**

## Installation

```bash
$ npm install
```

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

## Recommendataions

There's been a lot of work on this seed to be well intergated with VSCode. If you want to have the best development experience, you should download these extentions:

-   ESLint
-   Prettier

Because this app was created with nestjs, it will follow nestjs guidelines for files structure.

### Resources

-   `resourceName.controller.ts` - Makes the first contact with the resource. Will contain the translation from the API to our service.
-   `resourceName.service.ts` - Will contain all of our logic.
-   `resourceName.module.ts` - Module are wat combining the services to controllers. It will hold alll the configuration for a route.
-   `resourceName.dto.ts` - (optional) Will hold any specific types for the resource such as query/params/headers/body.

Resource will be in a folder inside `./src/`, and their modules will be imported to `./src/app.modules.ts`.
Theres could be more files added to a resource such as specific types for headers/body, those will be added to the file.

### Common

Here we hold anything that is not resource specific. Stuff that ar currently in there:

-   `logging.interceptor.ts` - Intercept every resource that you put it about the class. This is the component that will log the request/response.

This folder can be used for service specific handlers, or stuff used by many services (which in that case you should make MR to this seed).

Feel free to add things that belong tho the template, like middlewares, guards, common types etc.

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

The docker image will export the app on port 80, so its important to make sure that the configuration will have the same port open to expose the app. Only the `./dist` folder will be uploaded to the docker image! make sure that you run `$ npm run build` to create the latest version of the files (and that every config file you added are inside it).
