import { DataSource, EntitySubscriberInterface } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Outbox } from '../entities/Outbox';
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
