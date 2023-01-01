import { DomainEvent } from '../../../../shared/domain/DomainEvent';

export class UserCreatedEvent implements DomainEvent {
  public readonly name = 'UserCreatedEvent';

  public readonly dateTimeOccurred: Date;

  public readonly payload: string;

  constructor(userId: string) {
    this.payload = userId;
    this.dateTimeOccurred = new Date();
  }
}
