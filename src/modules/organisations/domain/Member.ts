import { MemberName } from './MemberName';

export class Member {
  readonly id: string;
  readonly name: MemberName;

  constructor(name: MemberName, id) {
    this.id = id;
    this.name = name;
  }

  static create(name, id): Member {
    return new Member(name, id);
  }
}
