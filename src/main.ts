import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/App';
import { Transport } from '@nestjs/microservices';

// Setup hybrid app with http and amqp
// Here we listen to our own queue. I would recommend using @golevelup/nestjs-rabbitmq instead.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'organisation_service',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(4999);
}
bootstrap();
