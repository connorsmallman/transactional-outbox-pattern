import { Injectable } from '@nestjs/common';

import { UserAggregate } from './UserAggregate';
import { User as UserTypeormEntity } from '../infrastructure/db/typeorm/entities/User';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserFactory } from './UserFactory';
@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly userFactory: UserFactory,
  ) {}

  async findById(id: string): Promise<UserAggregate> {
    const userTypeormEntity = await this.dataSource.manager.findOne(
      UserTypeormEntity,
      { where: { id } },
    );

    if (!userTypeormEntity) {
      return Promise.reject(new Error('User not found'));
    }

    const user = await this.userFactory.createFromPersistence(
      userTypeormEntity.name,
      userTypeormEntity.email,
      userTypeormEntity.password,
      userTypeormEntity.id,
    );

    return user;
  }

  async save(user: UserAggregate): Promise<UserAggregate> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deIdentifiedUser = user.getDeIdentifiedUser();
      const userTypeormEntity = new UserTypeormEntity({
        name: deIdentifiedUser.name,
        email: deIdentifiedUser.email,
        password: deIdentifiedUser.password,
        id: user.id,
      });
      await queryRunner.manager.save(userTypeormEntity);

      const outbox = user.getDomainEvents();

      for (const event of outbox) {
        const outboxTypeormEntity = new OutboxTypeormEntity({
          name: event.constructor.name,
          payload: event.payload,
          timestamp: event.dateTimeOccurred,
        });
        await queryRunner.manager.save(event);
      }

      await queryRunner.commitTransaction();

      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return Promise.reject(err);
    } finally {
      await queryRunner.release();
    }
  }
}
