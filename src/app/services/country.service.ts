import { Injectable } from '@angular/core';
import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

@Injectable({ providedIn: 'root' })
export class CountryService {
  getCountryName(code: string): string {
    return countries.getName(code.toUpperCase(), 'en') || code;
  }
}
