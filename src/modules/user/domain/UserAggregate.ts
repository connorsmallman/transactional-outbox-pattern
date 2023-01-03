import { Email } from './Email';
import { Password } from './Password';
import { Name } from './Name';

import { RootAggregate } from '../../../shared/domain/RootAggregate';
import { DomainEvent } from '../../../shared/domain/DomainEvent';
import { v4 } from 'uuid';
import { Country } from './Country';

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

  readonly country: Country;

  readonly domainEvents: readonly DomainEvent[] = [];

  constructor(
    name: Name,
    email: Email,
    password: Password,
    country: Country,
    domainEvents: readonly DomainEvent[],
    id?: string,
  ) {
    this.id = id || v4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.country = country;
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
      password: this.password.getValue(),
    };
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return this.domainEvents;
  }

  public static create(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
    rawCountry: {
      readonly id: string;
      readonly name: string;
      readonly isoCode: string;
    },
    domainEvents: readonly DomainEvent[] = [],
    id?: string,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);
    const country = new Country(
      rawCountry.id,
      rawCountry.name,
      rawCountry.isoCode,
    );

    return new UserAggregate(name, email, password, country, domainEvents, id);
  }
}
