import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/UsersController';
import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { UserRepository } from './domain/UserRepository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [CreateUserUseCase, UserRepository],
})
export class UsersModule {}
