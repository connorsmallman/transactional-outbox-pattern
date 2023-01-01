import { DomainEvent } from './DomainEvent';

export class RootAggregate {
  domainEvents: DomainEvent[] = [];

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}
