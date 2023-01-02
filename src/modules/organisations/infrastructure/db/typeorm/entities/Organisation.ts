import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  constructor(props) {
    super();
    this.id = props.id;
    this.name = props.name;
  }
}
