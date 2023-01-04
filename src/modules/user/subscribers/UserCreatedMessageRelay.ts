import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UserCreatedEvent } from '../domain/events/UserCreatedEvent';

type UserCreatedEventWithId = UserCreatedEvent & { readonly id: string };

// Our message relay is a simple class that listens for events and sends them to a message broker
// It then deletes the messages from the outbox
// Here we acknowledge the message from the message broker and make it transactional
export class UserCreatedMessageRelay {
  constructor(
    @Inject('ORGANISATION_SERVICE') private readonly client: ClientProxy,
    @InjectDataSource() private readonly dataSource: DataSource,
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
