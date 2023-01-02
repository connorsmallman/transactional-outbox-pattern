import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../usecases/CreateUserUseCase';
import { GetUserUseCase } from '../../usecases/GetUserUseCase';
import { either } from 'fp-ts';

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
    })();
    if (either.isLeft(response)) {
      throw new Error(response.left.message);
    } else {
      return response.right;
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
