import { ExampleService } from './example.service';
import { Controller, Param, Get, UseGuards, Req, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiHeader } from '@nestjs/swagger';
import { Example } from './models/example.model';
import { AuthenticationGuard, UserPremissions } from '@sick/authentication';

@ApiTags('example')
@UseGuards(AuthenticationGuard)
@ApiHeader({
	name: 'user-name',
	description: 'The username',
	required: true,
})
@Controller()
export class ExampleController {
	constructor(private readonly exampleService: ExampleService) {}

	@Get('example/:id')
	@ApiOkResponse({ type: Example })
	async getExample(@Param('userPremissions') userPremissions: UserPremissions, @Param('id') id: number) {
        console.log(userPremissions);
		return this.exampleService.getExample(id);
	}
}
