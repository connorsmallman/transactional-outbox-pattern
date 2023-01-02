import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UserRepository } from '../domain/UserRepository';
import { UserFactory } from '../domain/UserFactory';
import { FailedToCreateUserError } from '../domain/errors/FailedToCreateUserError';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  execute(
    userDTO: CreateUserDTO,
  ): taskEither.TaskEither<FailedToCreateUserError, void> {
    return pipe(
      taskEither.of(
        UserFactory.createNewUser(
          userDTO.name,
          userDTO.email,
          userDTO.password,
      )),
      taskEither.chain((user) => this.userRepository.save(user)),
      taskEither.mapLeft((error) => {
        return new FailedToCreateUserError(error.message);
      }),
      taskEither.map(() => undefined),
    );
  }
}
