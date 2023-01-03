import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentificationLookupService {
  async findById(id: string): Promise<string> {
    return Promise.resolve('some-value');
  }

  async lookup(nameKey: string, isoCode: string) {
    return Promise.resolve('some-value');
  }
}
