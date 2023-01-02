import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Organisation as OrganisationTypeormEntity } from '../infrastructure/db/typeorm/entities/Organisation';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { OrganisationAggregate } from './OrganisationAggregate';
import { OrganisationName } from './OrganisationName';

@Injectable()
export class OrganisationRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(OrganisationTypeormEntity)
    private readonly organisationRepository: Repository<OrganisationTypeormEntity>,
  ) {}

  async findById(id: string): Promise<OrganisationAggregate> {
    const organisation = await this.organisationRepository.findOneBy({ id });
    if (!organisation) {
      return Promise.reject(new Error('Organisation not found'));
    }
    const name = new OrganisationName(organisation.name);
    return OrganisationAggregate.create(name, [], [], id);
  }

  async save(organisation: OrganisationAggregate): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const organisationTypeormEntity = new OrganisationTypeormEntity({
        name: organisation.getName(),
        id: organisation.id,
      });
      await queryRunner.manager.save(organisationTypeormEntity);

      const outbox = organisation.getDomainEvents();

      for (const event of outbox) {
        const outboxTypeormEntity = new OutboxTypeormEntity({
          name: event.constructor.name,
          payload: event.payload,
          timestamp: event.dateTimeOccurred,
        });
        await queryRunner.manager.save(event);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return Promise.reject(err);
    } finally {
      await queryRunner.release();
    }
  }
}
