import { OrganisationAggregate } from './OrganisationAggregate';
import { OrganisationCreatedEvent } from './events/OrganisationCreatedEvent';

export class OrganisationFactory {
  public static createNewOrganisation(name: string): OrganisationAggregate {
    const organisation = new OrganisationAggregate(name);
    organisation.addDomainEvent(new OrganisationCreatedEvent(organisation));
    return organisation;
  }
}
