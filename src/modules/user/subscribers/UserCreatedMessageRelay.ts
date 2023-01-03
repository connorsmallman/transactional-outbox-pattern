import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UserCreatedEvent } from '../domain/events/UserCreatedEvent';

type UserCreatedEventWithId = UserCreatedEvent & { readonly id: string };

export class UserCreatedMessageRelay {
  constructor(
    @Inject('ORGANISATION_SERVICE') private client: ClientProxy,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  @OnEvent(UserCreatedEvent.name)
  async handleOrganisationCreatedEvent(payload: UserCreatedEventWithId) {
    await this.client.emit('user.created', payload);
    await this.dataSource.manager
      .createQueryBuilder()
      .delete()
      .from('Outbox')
      .where('id = :id', { id: payload.id })
      .execute();
    Logger.log(
      'handleUserCreatedEvent' + JSON.stringify(payload),
      'UserCreatedMessageRelay',
    );
  }
}
