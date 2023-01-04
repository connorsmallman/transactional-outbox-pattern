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
    // Any request validation should happen here
    if (!body.name) {
      throw new Error('Missing name');
    }
    // We call the use case which returns an Either.
    // We never throw exceptions in the business logic layer. Only return an Either. It's either a success or a failure.
    // We can then handle the success or failure in the controller and map it to the http status code and response.
    // If an exception is thrown, it will be caught by the global exception handler and mapped to a 500 error.
    // Use cases allows us to seperate the business logic from the framework.
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
