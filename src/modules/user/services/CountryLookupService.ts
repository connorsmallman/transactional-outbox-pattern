import { Injectable } from '@nestjs/common';
import { Country } from '../domain/Country';
import { v4 } from 'uuid';

// Example of a service that lookups some entity from our own db but we treat it as a value object
@Injectable()
export class CountryLookupService {
  async lookup(isoCode: string): Promise<Country> {
    return Promise.resolve(new Country(v4(), 'United States', 'US'));
  }
}
