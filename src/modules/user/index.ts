import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/UsersController';
import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { UserRepository } from './domain/UserRepository';
import { GetUserUseCase } from './usecases/GetUserUseCase';
import { UserFactory } from './domain/UserFactory';
import { IdentificationLookupService } from './services/IdentificationLookupService';
import { CountryLookupService } from './services/CountryLookupService';
import { UserCreatedCommandHandler } from './infrastructure/rmq/UserCreatedCommandHandler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserCreatedMessageRelay } from './subscribers/UserCreatedMessageRelay';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORGANISATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'organisation_service',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController, UserCreatedCommandHandler],
  providers: [
    UserCreatedMessageRelay,
    CountryLookupService,
    CreateUserUseCase,
    GetUserUseCase,
    UserFactory,
    IdentificationLookupService,
    UserRepository,
  ],
})
export class UsersModule {}
