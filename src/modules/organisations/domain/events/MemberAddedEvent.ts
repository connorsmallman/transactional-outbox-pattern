import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { Member } from '../Member';

export class MemberAddedEvent implements DomainEvent {
  readonly dateTimeOccurred: Date;

  readonly payload: Member;

  constructor(member: Member) {
    this.dateTimeOccurred = new Date();
    this.payload = member;
  }
}
