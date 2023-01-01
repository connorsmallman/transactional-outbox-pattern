import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { Member } from '../Member';

export class MemberAddedEvent implements DomainEvent {
  dateTimeOccurred: Date;

  data: Member;

  constructor(member: Member) {
    this.dateTimeOccurred = new Date();
    this.data = member;
  }
}
