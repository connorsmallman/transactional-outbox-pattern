export class Country {
  readonly id: string;
  readonly name: string;

  readonly isoCode: string;

  constructor(id: string, name: string, isoCode: string) {
    this.id = id;
    this.name = name;
    this.isoCode = isoCode;
  }
}
