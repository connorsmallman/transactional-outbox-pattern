import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentificationLookupService {
  async findById(id: string): Promise<string> {
    return Promise.resolve('some-value');
  }
}
