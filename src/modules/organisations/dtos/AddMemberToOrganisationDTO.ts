export interface AddMemberToOrganisationDTO {
  readonly organisationId: string;
  readonly member: {
    readonly id: string;
    readonly role: string;
    readonly name: string;
  };
}
