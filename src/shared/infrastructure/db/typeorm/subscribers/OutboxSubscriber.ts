import { DataSource, EntitySubscriberInterface } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Outbox } from '../entities/Outbox';

// This is a TypeORM subscriber that listens for changes to the outbox table
// When a new message is added to the outbox, it emits an event
// This event is then picked up by the message relay
// We could also delete the message from the outbox here but we need understand the transactional behaviour of TypeORM
@Injectable()
export class OutboxSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectDataSource() readonly datasource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {
    datasource.subscribers.push(this);
  }
  listenTo() {
    return Outbox;
  }

  afterInsert(event) {
    // We emit the event here to prevent blocking
    this.eventEmitter.emit(event.entity.name, event.entity);
  }
}
