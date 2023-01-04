import { OrganisationAggregate } from './OrganisationAggregate';
import { OrganisationCreatedEvent } from './events/OrganisationCreatedEvent';
import { v4 } from 'uuid';
import { OrganisationName } from './OrganisationName';

export class OrganisationFactory {
  public static createNewOrganisation(rawName: string): OrganisationAggregate {
    // Create a new OrganisationAggregate
    // Create a new OrganisationCreatedEvent
    // Add the OrganisationCreatedEvent to the OrganisationAggregate
    // Return the OrganisationAggregate
    // Our classes are readonly, so we need to create a new instance of the OrganisationAggregate
    const organisationId = v4();
    const name = new OrganisationName(rawName);
    return new OrganisationAggregate(
      name,
      [],
      [new OrganisationCreatedEvent(organisationId)],
      organisationId,
    );
  }
}
