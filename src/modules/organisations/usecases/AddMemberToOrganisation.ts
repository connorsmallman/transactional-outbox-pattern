import { Injectable } from '@nestjs/common';
import { AddMemberToOrganisationDTO } from '../dtos/AddMemberToOrganisationDTO';
import { OrganisationRepository } from '../domain/OrganisationRepository';
import { Member } from '../domain/Member';

@Injectable()
export class AddMemberToOrganisationUseCase {
  constructor(readonly organisationRepository: OrganisationRepository) {}

  async execute(addMemberToOrganisationDTO: AddMemberToOrganisationDTO) {
    const { member: memberProps, organisationId } = addMemberToOrganisationDTO;
    const organisation = await this.organisationRepository.findById(
      organisationId,
    );
    const member = Member.create(memberProps, memberProps.id);
    await organisation.addMember(member);

    await this.organisationRepository.save(organisation);
  }
}
