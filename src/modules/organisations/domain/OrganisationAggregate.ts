import { v4 as uuid } from 'uuid';

import { Member } from './Member';
import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { MemberAddedEvent } from './events/MemberAddedEvent';

type OrganisationProps = {
  name: string;
  members: Member[];
};

export class OrganisationAggregate {
  id: string;
  props: OrganisationProps;

  domainEvents: DomainEvent[];

  constructor(props, id = uuid()) {
    this.id = id;
    this.props = props;
    this.domainEvents = [];
  }

  get name() {
    return this.props.name;
  }

  get members() {
    return this.props.members;
  }

  getDomainEvents() {
    return this.domainEvents;
  }

  static create(props: OrganisationProps, id?: string): OrganisationAggregate {
    return new OrganisationAggregate(props, id);
  }

  addMember(member: Member) {
    this.props.members.push(member);
    this.domainEvents.push(new MemberAddedEvent(member));
  }
}
