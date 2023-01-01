import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UserAggregate } from './UserAggregate';
import { User as UserTypeormEntity } from '../infrastructure/db/typeorm/entities/User';
import { Outbox as OutboxTypeormEntity } from '../../../shared/infrastructure/db/typeorm/entities/Outbox';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserCreatedEvent } from './events/UserCreatedEvent';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async save(user: UserAggregate): Promise<UserAggregate> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userTypeormEntity = new UserTypeormEntity();
      userTypeormEntity.id = user.id;
      const deIdentifiedUser = user.getDeIdentifiedUser();
      userTypeormEntity.name = deIdentifiedUser.name;
      userTypeormEntity.email = deIdentifiedUser.email;
      userTypeormEntity.password = deIdentifiedUser.password;
      await queryRunner.manager.save(userTypeormEntity);

      const outbox = user.getDomainEvents();

      for (const event of outbox) {
        const outboxTypeormEntity = new OutboxTypeormEntity();
        outboxTypeormEntity.name = event.constructor.name;
        outboxTypeormEntity.payload = event.payload;
        outboxTypeormEntity.timestamp = event.dateTimeOccurred;
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
  async create(userDTO: CreateUserDTO): Promise<UserAggregate> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = UserAggregate.create(
      userDTO.name,
      userDTO.email,
      userDTO.password,
    );

    const event = new UserCreatedEvent(user.id);

    try {
      const userTypeormEntity = new UserTypeormEntity();
      userTypeormEntity.id = user.id;
      const deIdentifiedUser = user.getDeIdentifiedUser();
      userTypeormEntity.name = deIdentifiedUser.name;
      userTypeormEntity.email = deIdentifiedUser.email;
      userTypeormEntity.password = deIdentifiedUser.password;
      await queryRunner.manager.save(userTypeormEntity);

      const outboxTypeormEntity = new OutboxTypeormEntity();
      outboxTypeormEntity.name = event.constructor.name;
      outboxTypeormEntity.payload = deIdentifiedUser;
      outboxTypeormEntity.timestamp = event.dateTimeOccurred;
      await queryRunner.manager.save(outboxTypeormEntity);

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
