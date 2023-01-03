import { Injectable } from '@nestjs/common';
import { Country } from '../domain/Country';
import { v4 } from 'uuid';

@Injectable()
export class CountryLookupService {
  async lookup(isoCode: string): Promise<Country> {
    return Promise.resolve(new Country(v4(), 'United States', 'US'));
  }
}
