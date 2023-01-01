import { v4 as uuid } from 'uuid';
export class Password {
  private readonly value: string;

  private readonly key: string;

  constructor(value: string, key?: string) {
    this.value = value;
    this.key = key || uuid();
  }

  public getValue(): string {
    return this.value;
  }

  public getKey(): string {
    return this.key;
  }
}
