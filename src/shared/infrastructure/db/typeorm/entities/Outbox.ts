/* eslint-disable functional/prefer-readonly-type */
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Outbox extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timestamp: Date;

  @Column('json')
  payload: any;
}
