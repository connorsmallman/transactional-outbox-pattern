import { v4 } from 'uuid';

import { UserAggregate } from './UserAggregate';
import { Name } from './Name';
import { Email } from './Email';
import { Password } from './Password';
import { UserCreatedEvent } from './events/UserCreatedEvent';
import { Injectable } from '@nestjs/common';
import { IdentificationLookupService } from '../services/IdentificationLookupService';

@Injectable()
export class UserFactory {
  constructor(
    private readonly identificationLookupService: IdentificationLookupService,
  ) {}

  static createNewUser(
    rawName: string,
    rawEmail: string,
    rawPassword: string,
  ): UserAggregate {
    const name = new Name(rawName);
    const email = new Email(rawEmail);
    const password = new Password(rawPassword);
    const id = v4();

    return new UserAggregate(
      name,
      email,
      password,
      [new UserCreatedEvent(id)],
      id,
    );
  }
  async createFromPersistence(
    nameKey: string,
    emailKey: string,
    passwordKey: string,
    id: string,
  ): Promise<UserAggregate> {
    const nameValue = await this.identificationLookupService.findById(nameKey);
    const emailValue = await this.identificationLookupService.findById(
      emailKey,
    );
    const passwordValue = await this.identificationLookupService.findById(
      passwordKey,
    );

    const name = new Name(nameValue, nameKey);
    const email = new Email(emailValue, emailKey);
    const password = new Password(passwordValue, passwordKey);

    return new UserAggregate(name, email, password, [], id);
  }
}
