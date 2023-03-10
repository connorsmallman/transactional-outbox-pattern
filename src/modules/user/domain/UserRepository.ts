import { Injectable } from '@nestjs/common';

import { UserAggregate } from './UserAggregate';
import { User as UserTypeormEntity } from '../infrastructure/db/typeorm/entities/User';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserFactory } from './UserFactory';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';
@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly userFactory: UserFactory,
  ) {}

  findById(id: string): taskEither.TaskEither<Error, UserAggregate> {
    return pipe(
      taskEither.tryCatch(
        () =>
          this.dataSource.manager.findOne(UserTypeormEntity, { where: { id } }),
        (error: unknown) => new Error(String(error)),
      ),
      taskEither.chain((userTypeormEntity) => {
        if (!userTypeormEntity) {
          return taskEither.left(new Error('User not found'));
        }

        return taskEither.tryCatch(
          () =>
            this.userFactory.createFromPersistence(
              userTypeormEntity.name,
              userTypeormEntity.email,
              userTypeormEntity.password,
              userTypeormEntity.country,
              userTypeormEntity.id,
            ),
          (error: unknown) => new Error('Failed to create user from raw data'),
        );
      }),
    );
  }

  // Here we save the aggregate to the database as a transaction
  // We also save the domain events to the outbox table as a transaction
  // This means if the aggregate is saved but the events are not, the aggregate will be rolled back
  // If the service stops before the events are sent to the message broker, the events will be sent again on the next service start
  save(user: UserAggregate): taskEither.TaskEither<Error, UserAggregate> {
    return pipe(
      taskEither.tryCatch(
        () =>
          this.dataSource.transaction(async (entityManager) => {
            const userTypeormEntity = new UserTypeormEntity();
            userTypeormEntity.id = user.id;
            userTypeormEntity.name = user.name.getKey();
            userTypeormEntity.email = user.email.getKey();
            userTypeormEntity.password = user.password.getValue();
            await entityManager.save(userTypeormEntity);

            const outbox = user.getDomainEvents();

            for (const event of outbox) {
              const outboxTypeormEntity = new OutboxTypeormEntity();
              outboxTypeormEntity.name = event.constructor.name;
              outboxTypeormEntity.payload = event.payload;
              outboxTypeormEntity.timestamp = event.dateTimeOccurred;
              await entityManager.save(outboxTypeormEntity);
            }

            return user;
          }),
        (error: unknown) => new Error(String(error)),
      ),
    );
  }
}
