# transactional-outbox-pattern
transactional outbox design pattern nestjs rabbitmq

## Description
Demonstrates the transactional outbox pattern using nestjs and rabbitmq.

We dispatch a message to a queue when a domain event happens. The message is stored in a table called outbox. The message is dispatched to the queue only when the transaction is committed. If the transaction is rolled back, the message is not dispatched to the queue.
If the service is down, the message is not dispatched to the queue. When the service is up again, the message is dispatched to the queue.

It demos the following:
- User creation with pii data stored in a separate table (In production, the pii data should be in a different database and service but for the sake of simplicity, it is in the same database)
- Organisation creation
- Adding a Member to an organisation

### Getting Started
- Clone the repo
- Run `docker-compose up -d` to start the service, rabbitmq and postgres

### Prerequisites
- Docker
- Docker-compose

### Known issues
Sometimes nestjs will start before rabbitmq is ready. In that case, the service will error. To fix this, wait for the service to try again before sending a request.

## Todo
- [ ] Check for messages on startup and relay them to the queue
- [ ] Health check for rabbitmq