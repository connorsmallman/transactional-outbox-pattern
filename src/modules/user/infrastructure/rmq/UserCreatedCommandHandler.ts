import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class UserCreatedCommandHandler {
  @EventPattern('user.created')
  async handleOrganisationCreatedCommand(
    @Payload() data: readonly number[],
    @Ctx() context: RmqContext,
  ) {
    Logger.log(data);
  }
}
