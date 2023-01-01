import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Organisation as OrganisationTypeormEntity } from '../infrastructure/db/typeorm/entities/Organisation';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { OrganisationAggregate } from './OrganisationAggregate';
import { CreateOrganisationDTO } from '../dtos/CreateOrganisationDTO';
import { OrganisationCreatedEvent } from './events/OrganisationCreatedEvent';

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
    return OrganisationAggregate.create(
      { name: organisation.name, members: [] },
      id,
    );
  }

  async create(createOrganisationDto: CreateOrganisationDTO): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const event = new OrganisationCreatedEvent(createOrganisationDto);

    try {
      const organisation = OrganisationAggregate.create({
        name: createOrganisationDto.name,
        members: [],
      });
      const organisationTypeormEntity = new OrganisationTypeormEntity();
      organisationTypeormEntity.id = organisation.id;
      organisationTypeormEntity.name = createOrganisationDto.name;
      await queryRunner.manager.save(organisationTypeormEntity);

      const outboxTypeormEntity = new OutboxTypeormEntity();
      outboxTypeormEntity.name = event.constructor.name;
      outboxTypeormEntity.data = organisation;
      outboxTypeormEntity.timestamp = event.dateTimeOccurred;
      await queryRunner.manager.save(outboxTypeormEntity);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return Promise.reject(err);
    } finally {
      await queryRunner.release();
    }
  }

  async save(organisation: OrganisationAggregate): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const organisationTypeormEntity = new OrganisationTypeormEntity();
      organisationTypeormEntity.id = organisation.id;
      organisationTypeormEntity.name = organisation.name;
      await queryRunner.manager.save(organisationTypeormEntity);

      const outbox = organisation.getDomainEvents();

      for (const event of outbox) {
        const outboxTypeormEntity = new OutboxTypeormEntity();
        outboxTypeormEntity.name = event.constructor.name;
        outboxTypeormEntity.data = event.data;
        outboxTypeormEntity.timestamp = event.dateTimeOccurred;
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
