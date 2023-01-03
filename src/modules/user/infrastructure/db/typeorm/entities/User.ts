/*eslint-disable functional/prefer-readonly-type */
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Country } from './Country';
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

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;
}
