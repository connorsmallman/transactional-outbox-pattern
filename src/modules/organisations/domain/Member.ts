type MemberProps = {
  name: string;
  role: string;
};
export class Member {
  id: string;
  props: MemberProps;

  constructor(props, id) {
    this.id = id;
    this.props = props;
  }

  static create(props: MemberProps, id): Member {
    return new Member(props, id);
  }
}
