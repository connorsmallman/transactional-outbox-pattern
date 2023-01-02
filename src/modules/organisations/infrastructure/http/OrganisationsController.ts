import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AddMemberToOrganisationUseCase } from '../../usecases/AddMemberToOrganisationUseCase';
import { CreateOrganisationUseCase } from '../../usecases/CreateOrganisationUseCase';
import { either } from 'fp-ts';

@Controller('organisations')
export class OrganisationsController {
  constructor(
    private readonly addMemberToOrganisationUseCase: AddMemberToOrganisationUseCase,
    private readonly createOrganisationUseCase: CreateOrganisationUseCase,
  ) {}

  @Post()
  async createOrganisation(@Body() body) {
    if (!body.name) {
      throw new Error('Missing name');
    }
    const response = await this.createOrganisationUseCase.execute({
      name: body.name,
    })();
    if (either.isLeft(response)) {
      throw new Error(response.left.message);
    } else {
      return response.right;
    }
  }

  @Put(':organisation_id/members')
  async addMemberToOrganisation(
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
    const response = await this.addMemberToOrganisationUseCase.execute(
      request,
    )();
    if (either.isLeft(response)) {
      throw new Error(response.left.message);
    } else {
      return response.right;
    }
  }
}
