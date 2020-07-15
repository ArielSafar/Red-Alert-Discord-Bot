import { Example } from './models/example.model';
import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { ExampleService } from './example.service';

@Resolver(of => Example)
export class ExampleResolver {
    constructor(private exampleService: ExampleService) { }

    @Query(returns => Example)
    async example(@Args('id', { type: () => Int }) id: number) {
        return this.exampleService.getExample(id);
    }

}
