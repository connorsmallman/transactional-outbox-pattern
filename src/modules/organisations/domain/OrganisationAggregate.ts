import { v4 as uuid } from 'uuid';

import { Member } from './Member';
import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { MemberAddedEvent } from './events/MemberAddedEvent';
import { RootAggregate } from '../../../shared/domain/RootAggregate';

type OrganisationProps = {
  name: string;
  members: Member[];
};

export class OrganisationAggregate extends RootAggregate {
  id: string;
  props: OrganisationProps;

  constructor(props, id = uuid()) {
    super();
    this.id = id;
    this.props = props;
  }

  get name() {
    return this.props.name;
  }

  get members() {
    return this.props.members;
  }

  static create(props: OrganisationProps, id?: string): OrganisationAggregate {
    return new OrganisationAggregate(props, id);
  }

  addMember(member: Member) {
    this.props.members.push(member);
    this.addDomainEvent(new MemberAddedEvent(member));
  }
}
