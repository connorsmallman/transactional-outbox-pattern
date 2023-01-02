import { Injectable } from '@nestjs/common';

import { OrganisationRepository } from '../domain/OrganisationRepository';
import { CreateOrganisationDTO } from '../dtos/CreateOrganisationDTO';
import { OrganisationFactory } from '../domain/OrganisationFactory';

@Injectable()
export class CreateOrganisationUseCase {
  constructor(
    private readonly organisationRepository: OrganisationRepository,
  ) {}

  execute(createOrganisationDTO: CreateOrganisationDTO): Promise<void> {
    const organisation = OrganisationFactory.createNewOrganisation(
      createOrganisationDTO.name,
    );
    return this.organisationRepository.save(organisation);
  }
}
