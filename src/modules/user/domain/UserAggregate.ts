import { Email } from './Email';
import { Password } from './Password';
import { Name } from './Name';

import { RootAggregate } from '../../../shared/domain/RootAggregate';
import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { v4 } from 'uuid';

type DeIdentifiedUser = {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
};

export class UserAggregate implements RootAggregate {
  readonly id: string;

  readonly email: Email;

  readonly name: Name;

  readonly password: Password;

  readonly domainEvents: readonly DomainEvent[] = [];

  constructor(
    name: Name,
    email: Email,
    password: Password,
    domainEvents: readonly DomainEvent[],
    id?: string,
  ) {
    this.id = id || v4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.domainEvents = domainEvents;
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

  public getDeIdentifiedUser(): DeIdentifiedUser {
    return {
      id: this.id,
      name: this.name.getKey(),
      email: this.email.getKey(),
      password: this.password.getKey(),
    };
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return this.domainEvents;
  }

  public static create(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
    domainEvents: readonly DomainEvent[] = [],
    id?: string,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);

    return new UserAggregate(name, email, password, domainEvents, id);
  }
}
