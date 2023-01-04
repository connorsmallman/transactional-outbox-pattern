import { either } from 'fp-ts';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

import { CreateUserUseCase } from '../../usecases/CreateUserUseCase';
import { GetUserUseCase } from '../../usecases/GetUserUseCase';

// We use the controller to map the http request to the use case
// We can then handle the success or failure in the controller and map it to the http status code and response.
// If an exception is thrown, it will be caught by the global exception handler and mapped to a 500 error.
// Use cases allows us to separate the business logic from the framework.
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body) {
    if (!body.name) {
      throw new Error('Missing name');
    }
    const response = await this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      countryIsoCode: body.countryIsoCode,
    })();
    if (either.isLeft(response)) {
      throw new Error(response.left.message);
    } else {
      return {
        id: response.right.id,
      };
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const response = await this.getUserUseCase.execute(id)();
    if (either.isLeft(response)) {
      throw new Error(response.left.message);
    } else {
      return response.right;
    }
  }
}
