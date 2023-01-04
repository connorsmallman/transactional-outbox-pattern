import { v4 } from 'uuid';

import { UserAggregate } from './UserAggregate';
import { Name } from './Name';
import { Email } from './Email';
import { Password } from './Password';
import { UserCreatedEvent } from './events/UserCreatedEvent';
import { Injectable } from '@nestjs/common';
import { IdentificationLookupService } from '../services/IdentificationLookupService';
import { Country } from './Country';

@Injectable()
export class UserFactory {
  constructor(
    private readonly identificationLookupService: IdentificationLookupService,
  ) {}

  static createNewUser(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
    country: Country,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);
    const id = v4();

    return new UserAggregate(
      name,
      email,
      password,
      country,
      [
        new UserCreatedEvent({
          id,
          name: {
            key: name.getKey(),
            value: name.getValue(),
          },
          email: {
            key: email.getKey(),
            value: email.getValue(),
          },
          password: password.getValue(),
          countryIsoCode: country.isoCode,
        }),
      ],
      id,
    );
  }

  // Not sure if I'm happy with the service lookup here, but it's a start and the goal is to move it to the data layer
  async createFromPersistence(
    nameKey: string,
    emailKey: string,
    rawPassword: string,
    rawCountry: {
      readonly isoCode: string;
      readonly name: string;
      readonly id: string;
    },
    id: string,
  ): Promise<UserAggregate> {
    const nameValue = await this.identificationLookupService.lookup(
      nameKey,
      rawCountry.isoCode,
    );
    const emailValue = await this.identificationLookupService.lookup(
      emailKey,
      rawCountry.isoCode,
    );

    const name = new Name(nameValue, nameKey);
    const email = new Email(emailValue, emailKey);
    const password = new Password(rawPassword);
    const country = new Country(
      rawCountry.id,
      rawCountry.name,
      rawCountry.isoCode,
    );

    return new UserAggregate(name, email, password, country, [], id);
  }
}
