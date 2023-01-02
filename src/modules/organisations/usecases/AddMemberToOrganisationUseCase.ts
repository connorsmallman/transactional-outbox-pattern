import { Injectable } from '@nestjs/common';
import { R, Result } from '@mobily/ts-belt';

import { AddMemberToOrganisationDTO } from '../dtos/AddMemberToOrganisationDTO';
import { OrganisationRepository } from '../domain/OrganisationRepository';
import { Member } from '../domain/Member';
import { FailedToAddMemberToOrganisationError } from '../domain/errors/FailedToAddMemberToOrganisationError';

type AddMemberToOrganisationResponse = {
  readonly organisationId: string;
};

@Injectable()
export class AddMemberToOrganisationUseCase {
  constructor(readonly organisationRepository: OrganisationRepository) {}

  async execute(
    addMemberToOrganisationDTO: AddMemberToOrganisationDTO,
  ): Promise<
    Result<
      AddMemberToOrganisationResponse,
      FailedToAddMemberToOrganisationError
    >
  > {
    const { member: memberProps, organisationId } = addMemberToOrganisationDTO;
    const organisation = await this.organisationRepository.findById(
      organisationId,
    );
    const member = Member.create(memberProps, memberProps.id);
    await organisation.addMember(member);

    try {
      await this.organisationRepository.save(organisation);
      return R.Ok({
        organisationId,
      });
    } catch (error: unknown) {
      const message = (error as Error).message;
      return R.Error(new FailedToAddMemberToOrganisationError(message));
    }
  }
}
