import { Injectable } from '@nestjs/common';

import { OrganisationRepository } from '../domain/OrganisationRepository';
import { CreateOrganisationDTO } from '../dtos/CreateOrganisationDTO';
import { OrganisationFactory } from '../domain/OrganisationFactory';
import { taskEither } from 'fp-ts';
import { FailedToCreateOrganisationError } from '../domain/errors/FailedToCreateOrganisationError';
import { pipe } from 'fp-ts/function';
import { OrganisationAggregate } from '../domain/OrganisationAggregate';

@Injectable()
export class CreateOrganisationUseCase {
  constructor(
    private readonly organisationRepository: OrganisationRepository,
  ) {}

  execute(
    createOrganisationDTO: CreateOrganisationDTO,
  ): taskEither.TaskEither<FailedToCreateOrganisationError, void> {
    // Use the factory to create a new OrganisationAggregate
    // Persist the OrganisationAggregate to the database using the repository
    // Return a TaskEither
    return pipe(
      taskEither.of(
        OrganisationFactory.createNewOrganisation(createOrganisationDTO.name),
      ),
      taskEither.chain((organisation: OrganisationAggregate) =>
        this.organisationRepository.save(organisation),
      ),
      taskEither.mapLeft((error) => {
        return new FailedToCreateOrganisationError(error.message);
      }),
      taskEither.map(() => undefined),
    );
  }
}
