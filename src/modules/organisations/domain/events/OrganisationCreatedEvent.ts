import { DomainEvent } from '../../../../shared/domain/DomainEvent';

export class OrganisationCreatedEvent implements DomainEvent {
  public readonly dateTimeOccurred: Date;
  readonly payload: string;

  constructor(organisationId: string) {
    this.dateTimeOccurred = new Date();
    this.payload = organisationId;
  }
}
