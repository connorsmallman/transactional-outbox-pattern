import { OrganisationAggregate } from './OrganisationAggregate';
import { OrganisationCreatedEvent } from './events/OrganisationCreatedEvent';
import { v4 } from 'uuid';
import { OrganisationName } from './OrganisationName';

export class OrganisationFactory {
  public static createNewOrganisation(rawName: string): OrganisationAggregate {
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
