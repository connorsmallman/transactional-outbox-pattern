import { v4 as uuid } from 'uuid';

import { Email } from './Email';
import { Password } from './Password';
import { Name } from './Name';

import { RootAggregate } from '../../../shared/domain/RootAggregate';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserAggregate extends RootAggregate {
  id: string;

  email: Email;

  name: Name;

  password: Password;

  constructor(name: Name, email: Email, password: Password, id?: string) {
    super();
    this.id = id || uuid();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public getDeIdentifiedUser(): User {
    return {
      id: this.id,
      name: this.name.getKey(),
      email: this.email.getKey(),
      password: this.password.getKey(),
    };
  }

  public static create(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
    id?: string,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);

    return new UserAggregate(name, email, password, id);
  }
}
