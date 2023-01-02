import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Outbox extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly timestamp: Date;

  @Column('json')
  readonly payload: any;

  constructor(props) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.timestamp = props.timestamp;
    this.payload = props.payload;
  }
}
