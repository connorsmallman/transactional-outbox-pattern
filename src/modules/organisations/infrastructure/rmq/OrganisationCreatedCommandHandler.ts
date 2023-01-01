import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class OrganisationCreatedCommandHandler {
  @EventPattern('organisation.created')
  async handleOrganisationCreatedCommand(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ) {
    Logger.log(data);
    Logger.log(
      'handleOrganisationCreatedCommand' + JSON.stringify(context.getMessage()),
      'OrganisationCreatedCommandHandler',
    );
  }
}
