import { ExampleService } from './example.service';
import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Example } from './models/example.model';

@ApiTags('example')
@Controller()
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) { }

    @Get("example/:id")
    @ApiOkResponse({ type: Example })
    async getExample(@Param('id') id: number) {
        return this.exampleService.getExample(id);
    }

}
