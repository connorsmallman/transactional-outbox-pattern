import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UserCreatedPayloadDTO } from '../../dtos/UserCreatedPayloadDTO';

export class UserCreatedEvent implements DomainEvent {
  public readonly name = 'UserCreatedEvent';

  public readonly dateTimeOccurred: Date;

  public readonly payload: UserCreatedPayloadDTO;

  constructor(user: UserCreatedPayloadDTO) {
    this.payload = user;
    this.dateTimeOccurred = new Date();
  }
}
