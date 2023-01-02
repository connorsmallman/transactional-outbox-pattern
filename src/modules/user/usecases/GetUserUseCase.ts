import { Injectable } from '@nestjs/common';
import { taskEither } from 'fp-ts';

import { UserRepository } from '../domain/UserRepository';
import { FailedToGetUserError } from '../domain/errors/FailedToGetUserError';
import { UserAggregate } from '../domain/UserAggregate';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(
    id: string,
  ): taskEither.TaskEither<FailedToGetUserError, UserAggregate> {
    return this.userRepository.findById(id);
  }
}
