import { Injectable } from '@nestjs/common';

import { OrganisationRepository } from '../domain/OrganisationRepository';
import { CreateOrganisationDTO } from '../dtos/CreateOrganisationDTO';

@Injectable()
export class CreateOrganisationUseCase {
  constructor(
    private readonly organisationRepository: OrganisationRepository,
  ) {}

  execute(createOrganisationDto: CreateOrganisationDTO): Promise<void> {
    return this.organisationRepository.create(createOrganisationDto);
  }
}
