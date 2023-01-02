import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AddMemberToOrganisationUseCase } from '../../usecases/AddMemberToOrganisationUseCase';
import { CreateOrganisationUseCase } from '../../usecases/CreateOrganisationUseCase';

@Controller('organisations')
export class OrganisationsController {
  constructor(
    private readonly addMemberToOrganisationUseCase: AddMemberToOrganisationUseCase,
    private readonly createOrganisationUseCase: CreateOrganisationUseCase,
  ) {}

  @Post()
  createOrganisation(@Body() body) {
    if (!body.name) {
      throw new Error('Missing name');
    }
    return this.createOrganisationUseCase.execute({
      name: body.name,
    });
  }

  @Put(':organisation_id/members')
  addMemberToOrganisation(
    @Param('organisation_id') organisationId: string,
    @Body() body,
  ) {
    const request = {
      organisationId,
      member: {
        id: body.userId,
        role: body.role,
        name: body.name,
      },
    };
    return this.addMemberToOrganisationUseCase.execute(request);
  }
}
