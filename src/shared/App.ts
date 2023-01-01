import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/user';
import { OrganisationsModule } from '../modules/organisations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OutboxSubscriber } from './infrastructure/db/typeorm/subscribers/OutboxSubscriber';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    // NOTE: TypeORM Subscribers are injected through Nest DI and register themselves with the TypeORM datasource
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [__dirname + '/../**/db/typeorm/entities/*.{ts,js}'],
      synchronize: true,
    }),
    UsersModule,
    OrganisationsModule,
  ],
  controllers: [],
  providers: [OutboxSubscriber],
})
export class AppModule {}
