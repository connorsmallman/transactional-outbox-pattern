import { Injectable } from '@nestjs/common';

import { AddMemberToOrganisationDTO } from '../dtos/AddMemberToOrganisationDTO';
import { OrganisationRepository } from '../domain/OrganisationRepository';
import { Member } from '../domain/Member';
import { FailedToAddMemberToOrganisationError } from '../domain/errors/FailedToAddMemberToOrganisationError';
import { OrganisationAggregate } from '../domain/OrganisationAggregate';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/function';

type AddMemberToOrganisationResponse = {
  readonly organisationId: string;
};

@Injectable()
export class AddMemberToOrganisationUseCase {
  constructor(readonly organisationRepository: OrganisationRepository) {}

  execute(
    addMemberToOrganisationDTO: AddMemberToOrganisationDTO,
  ): taskEither.TaskEither<
    FailedToAddMemberToOrganisationError,
    AddMemberToOrganisationResponse
  > {
    return pipe(
      this.organisationRepository.findById(
        addMemberToOrganisationDTO.organisationId,
      ),
      taskEither.map((organisation: OrganisationAggregate) => {
        const member = Member.create(
          addMemberToOrganisationDTO.member.name,
          addMemberToOrganisationDTO.member.id,
        );
        return organisation.addMember(member);
      }),
      taskEither.chain((organisation: OrganisationAggregate) => {
        return this.organisationRepository.save(organisation);
      }),
      taskEither.map((organisation: OrganisationAggregate) => ({
        organisationId: organisation.id,
      })),
      taskEither.mapLeft((error) => {
        return new FailedToAddMemberToOrganisationError(error.message);
      }),
    );
  }
}
