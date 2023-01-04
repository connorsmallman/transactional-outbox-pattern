import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

// Our message handler is a simple class that listens for messages and handles them
// Here we could also acknowledge the message from the message broker and make it transactional
// This class would normally live in a separate service, but we have put it here for simplicity
@Controller()
export class OrganisationCreatedCommandHandler {
  @EventPattern('organisation.created')
  async handleOrganisationCreatedCommand(
    @Payload() data: readonly number[],
    @Ctx() context: RmqContext,
  ) {
    Logger.log(data);
    Logger.log(
      'handleOrganisationCreatedCommand' + JSON.stringify(context.getMessage()),
      'OrganisationCreatedCommandHandler',
    );
  }
}
