/*eslint-disable functional/prefer-readonly-type */
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;
}
