import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;
}
