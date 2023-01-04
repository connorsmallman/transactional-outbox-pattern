import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserCreatedPayloadDTO } from '../../dtos/UserCreatedPayloadDTO';
import { UserCreatedEvent } from '../../domain/events/UserCreatedEvent';

@Controller()
export class UserCreatedCommandHandler {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @EventPattern('user.created')
  async handleOrganisationCreatedCommand(
    @Payload() data: UserCreatedEvent,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    await this.dataSource.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .insert()
        .into('pii')
        .values([
          {
            key: data.payload.name.key,
            value: data.payload.name.value,
          },
          {
            key: data.payload.email.key,
            value: data.payload.email.value,
          },
        ])
        .execute();

      channel.ack(originalMessage);
    });
  }
}
