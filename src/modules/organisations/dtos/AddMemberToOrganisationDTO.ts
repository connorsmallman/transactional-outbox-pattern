export type AddMemberToOrganisationDTO = {
  organisationId: string;
  member: {
    id: string;
    role: string;
    name: string;
  };
};
