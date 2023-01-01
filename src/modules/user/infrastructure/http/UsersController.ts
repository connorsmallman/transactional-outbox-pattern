import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../usecases/CreateUserUseCase';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

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
}
