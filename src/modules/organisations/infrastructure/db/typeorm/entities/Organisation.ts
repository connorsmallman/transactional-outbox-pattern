import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  constructor(props) {
    super();
    this.id = props.id || v4();
    this.name = props.name;
  }
}
