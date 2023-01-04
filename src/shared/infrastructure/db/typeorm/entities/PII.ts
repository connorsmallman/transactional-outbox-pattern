/* eslint-disable functional/prefer-readonly-type */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pii')
export class PII {
  @PrimaryColumn('uuid')
  key: string;

  @Column()
  value: string;
}
