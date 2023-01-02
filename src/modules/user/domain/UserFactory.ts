import { v4 } from 'uuid';

import { UserAggregate } from './UserAggregate';
import { Name } from './Name';
import { Email } from './Email';
import { Password } from './Password';
import { UserCreatedEvent } from './events/UserCreatedEvent';

export class UserFactory {

  static createNewUser(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);
    const id = v4();

    const user = new UserAggregate(name, email, password, id);

    user.addDomainEvent(new UserCreatedEvent(id));

    return user;
  }

  static createFromPersistence(
    nameKey: string,
    emailKey: string,
    passwordKey: string,
    id: string,
  ): UserAggregate {
    const name = new Name('', nameKey);
    const email = new Email('', emailKey);
    const password = new Password('', passwordKey);

    return new UserAggregate(name, email, password, id);
  }
}
