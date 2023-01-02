import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../usecases/CreateUserUseCase';
import { GetUserUseCase } from '../../usecases/GetUserUseCase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  createUser(@Body() body) {
    if (!body.name) {
      throw new Error('Missing name');
    }
    return this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    });
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }
}
