import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Outbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timestamp: Date;

  @Column('json')
  payload: any;
}
