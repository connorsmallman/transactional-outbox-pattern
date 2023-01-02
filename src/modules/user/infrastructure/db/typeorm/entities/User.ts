import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column()
  readonly email: string;

  @Column()
  readonly password: string;

  constructor(props) {
    super();
    this.id = props.id || v4();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
