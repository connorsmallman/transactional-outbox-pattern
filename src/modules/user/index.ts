import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/UsersController';
import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { UserRepository } from './domain/UserRepository';
import { GetUserUseCase } from './usecases/GetUserUseCase';
import { UserFactory } from './domain/UserFactory';
import { IdentificationLookupService } from './services/IdentificationLookupService';
import { CountryLookupService } from './services/CountryLookupService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CountryLookupService,
    CreateUserUseCase,
    GetUserUseCase,
    UserFactory,
    IdentificationLookupService,
    UserRepository,
  ],
})
export class UsersModule {}
