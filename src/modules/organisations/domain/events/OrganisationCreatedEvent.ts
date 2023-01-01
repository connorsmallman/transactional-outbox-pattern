import { Organisation } from '../Organisation';
import { DomainEvent } from '../../../../shared/domain/DomainEvent';

export class OrganisationCreatedEvent implements DomainEvent {
  public dateTimeOccurred: Date;
  data: Organisation;

  constructor(organisation: Organisation) {
    this.dateTimeOccurred = new Date();
    this.data = organisation;
  }
}
