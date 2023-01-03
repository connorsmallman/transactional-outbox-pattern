/*eslint-disable functional/prefer-readonly-type */
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
