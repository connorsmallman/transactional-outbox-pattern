import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Organisation as OrganisationTypeormEntity } from '../infrastructure/db/typeorm/entities/Organisation';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { OrganisationAggregate } from './OrganisationAggregate';
import { OrganisationName } from './OrganisationName';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';

@Injectable()
export class OrganisationRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(OrganisationTypeormEntity)
    private readonly organisationRepository: Repository<OrganisationTypeormEntity>,
  ) {}

  findById(id: string): taskEither.TaskEither<Error, OrganisationAggregate> {
    return pipe(
      taskEither.tryCatch(
        () => this.organisationRepository.findOne({ where: { id } }),
        (error: unknown) => new Error(String(error)),
      ),
      taskEither.chain((organisationTypeormEntity) => {
        if (!organisationTypeormEntity) {
          return taskEither.left(new Error('Organisation not found'));
        }

        return taskEither.right(
          OrganisationAggregate.create(
            new OrganisationName(organisationTypeormEntity.name),
            [],
            [],
            organisationTypeormEntity.id,
          ),
        );
      }),
    );
  }

  save(
    organisation: OrganisationAggregate,
  ): taskEither.TaskEither<Error, OrganisationAggregate> {
    return pipe(
      taskEither.tryCatch(
        () =>
          this.dataSource.transaction(async (entityManager) => {
            const organisationTypeormEntity = new OrganisationTypeormEntity();
            organisationTypeormEntity.id = organisation.id;
            organisationTypeormEntity.name = organisation.name.value;
            await entityManager.save(organisationTypeormEntity);

            const outbox = organisation.getDomainEvents();

            for (const event of outbox) {
              const outboxTypeormEntity = new OutboxTypeormEntity({
                name: event.constructor.name,
                payload: event.payload,
                timestamp: event.dateTimeOccurred,
              });
              await entityManager.save(outboxTypeormEntity);
            }
          }),
        (error: unknown) => new Error(String(error)),
      ),
      taskEither.map(() => organisation),
    );
  }
}
