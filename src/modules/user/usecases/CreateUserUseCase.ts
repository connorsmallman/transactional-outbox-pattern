import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UserRepository } from '../domain/UserRepository';
import { UserFactory } from '../domain/UserFactory';
import { FailedToCreateUserError } from '../domain/errors/FailedToCreateUserError';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { CountryLookupService } from '../services/CountryLookupService';
import { UserAggregate } from '../domain/UserAggregate';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly countryLookupService: CountryLookupService,
  ) {}
  execute(
    userDTO: CreateUserDTO,
  ): taskEither.TaskEither<FailedToCreateUserError, UserAggregate> {
    return pipe(
      taskEither.tryCatch(
        () => this.countryLookupService.lookup(userDTO.countryIsoCode),
        (error: unknown) => new Error(String(error)),
      ),
      taskEither.chain((country) => {
        Logger.log(country);
        return taskEither.right(
          UserFactory.createNewUser(
            userDTO.name,
            userDTO.email,
            userDTO.password,
            country,
          ),
        );
      }),
      taskEither.chain((user) => {
        Logger.log(user);
        return this.userRepository.save(user);
      }),
      taskEither.mapLeft((error) => {
        return new FailedToCreateUserError(error.message);
      }),
    );
  }
}
