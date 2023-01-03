import { Injectable } from '@nestjs/common';
import { Country } from '../domain/Country';

@Injectable()
export class CountryLookupService {
  async lookup(isoCode: string): Promise<Country> {
    return {
      id: '1',
      name: 'United States',
      isoCode: 'US',
    };
  }
}
