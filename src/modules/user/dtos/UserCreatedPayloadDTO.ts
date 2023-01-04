export interface UserCreatedPayloadDTO {
  readonly id: string;
  readonly name: {
    readonly key: string;
    readonly value: string;
  };
  readonly email: {
    readonly key: string;
    readonly value: string;
  };
  readonly password: string;
  readonly countryIsoCode: string;
}