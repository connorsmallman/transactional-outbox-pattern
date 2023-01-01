import { OrganisationCreatedEvent } from '../domain/events/OrganisationCreatedEvent';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

type OrganisationCreatedEventWithId = OrganisationCreatedEvent & { id: string };

export class OrganisationCreatedMessageRelay {
  constructor(
    @Inject('ORGANISATION_SERVICE') private client: ClientProxy,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  @OnEvent(OrganisationCreatedEvent.name)
  async handleOrganisationCreatedEvent(
    payload: OrganisationCreatedEventWithId,
  ) {
    await this.client.emit('organisation.created', payload);
    await this.dataSource.manager
      .createQueryBuilder()
      .delete()
      .from('Outbox')
      .where('id = :id', { id: payload.id })
      .execute();
    Logger.log(
      'handleOrganisationCreatedEvent' + JSON.stringify(payload),
      'OrganisationCreatedMessageRelay',
    );
  }
}
