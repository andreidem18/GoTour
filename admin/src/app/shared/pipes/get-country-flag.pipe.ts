import { Pipe, PipeTransform, inject } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Pipe({
  name: 'getCountryFlag'
})
export class GetCountryFlagPipe implements PipeTransform {

  private countriesService = inject(CountriesService);

  transform(value: string, ...args: unknown[]): unknown {
    console.log(this.countriesService.allCountries)
    const country = this.countriesService
      .allCountries.find(c => {
        console.log(c.name)
        console.log(value)
        return c.name === value
      });
    return country?.flag;
  }

}
