export class FailedToAddMemberToOrganisationError extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
