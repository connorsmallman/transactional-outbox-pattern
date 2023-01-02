export class FailedToCreateOrganisationError extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
