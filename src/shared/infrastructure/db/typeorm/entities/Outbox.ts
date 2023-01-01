import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

@Entity()
export class Outbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timestamp: Date;

  @Column('json')
  data: any;
}
