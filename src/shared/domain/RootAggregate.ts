import { DomainEvent } from './DomainEvent';

export interface RootAggregate {
  readonly domainEvents: readonly DomainEvent[];

  getDomainEvents(): readonly DomainEvent[];
}
