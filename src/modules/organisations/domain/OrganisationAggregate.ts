import { v4 as uuid } from 'uuid';

import { Member } from './Member';
import { MemberAddedEvent } from './events/MemberAddedEvent';
import { RootAggregate } from '../../../shared/domain/RootAggregate';
import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { OrganisationName } from './OrganisationName';

// This is our root aggregate
// It is the only aggregate that can be saved to the database
export class OrganisationAggregate implements RootAggregate {
  readonly id: string;
  readonly name: OrganisationName;

  readonly members: readonly Member[];

  readonly domainEvents: readonly DomainEvent[] = [];

  constructor(name, members, domainEvents, id = uuid()) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.domainEvents = domainEvents;
  }

  static create(
    name: OrganisationName,
    members: readonly Member[] = [],
    domainEvents: readonly DomainEvent[] = [],
    id?: string,
  ): OrganisationAggregate {
    return new OrganisationAggregate(name, members, domainEvents, id);
  }

  public getName() {
    return this.name.value;
  }

  public getDomainEvents() {
    return this.domainEvents;
  }

  public addMember(member: Member): OrganisationAggregate {
    // We return a new instance of the OrganisationAggregate with the new member added
    const newMembers = [...this.members, member];
    const newDomainEvents = [
      ...this.domainEvents,
      new MemberAddedEvent(member),
    ];
    return new OrganisationAggregate(
      this.name,
      newMembers,
      newDomainEvents,
      this.id,
    );
  }
}
