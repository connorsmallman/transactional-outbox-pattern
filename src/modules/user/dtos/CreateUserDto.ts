export interface CreateUserDTO {
  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly countryIsoCode: string;
}
