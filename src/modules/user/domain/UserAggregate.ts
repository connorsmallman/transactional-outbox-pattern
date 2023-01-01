import { v4 as uuid } from 'uuid';

import { Email } from './Email';
import { Password } from './Password';
import { Name } from './Name';

import { User } from './User';
import { RootAggregate } from '../../../shared/domain/RootAggregate';

type UserProps = {
  name: Name;
  email: Email;
  password: Password;
};
export class UserAggregate extends RootAggregate {
  id: string;
  props: UserProps;

  constructor(props: UserProps, id?: string) {
    super();
    this.id = id || uuid();
    this.props = props;
  }

  get name(): string {
    return this.props.name.getValue();
  }

  get email(): string {
    return this.props.email.getValue();
  }

  get password(): string {
    return this.props.password.getKey();
  }

  public getDeIdentifiedUser(): User {
    return new User(
      this.id,
      this.props.name.getKey(),
      this.props.email.getKey(),
      this.props.password.getKey(),
    );
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

    return new UserAggregate({ name, email, password }, id);
  }
}
