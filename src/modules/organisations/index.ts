import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganisationsController } from './infrastructure/http/OrganisationsController';
import { AddMemberToOrganisationUseCase } from './usecases/AddMemberToOrganisationUseCase';
import { CreateOrganisationUseCase } from './usecases/CreateOrganisationUseCase';
import { OrganisationRepository } from './domain/OrganisationRepository';
import { Organisation as OrganisationTypeormEntity } from './infrastructure/db/typeorm/entities/Organisation';
import { Outbox as OutboxTypeormEntity } from '../../shared/infrastructure/db/typeorm/entities/Outbox';
import { OrganisationCreatedMessageRelay } from './subscribers/OrganisationCreatedMessageRelay';
import { OrganisationCreatedCommandHandler } from './infrastructure/rmq/OrganisationCreatedCommandHandler';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    TypeOrmModule.forFeature([OrganisationTypeormEntity, OutboxTypeormEntity]),
  ],
  controllers: [OrganisationsController, OrganisationCreatedCommandHandler],
  providers: [
    OrganisationCreatedCommandHandler,
    OrganisationCreatedMessageRelay,
    OrganisationRepository,
    AddMemberToOrganisationUseCase,
    CreateOrganisationUseCase,
  ],
})
export class OrganisationsModule {}
