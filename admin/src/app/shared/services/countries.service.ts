import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country, CountryRes } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() {
    this.getAllCountries();
  }
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1'

  private _allCountries: Country[] = [];
  get allCountries(){ return [...this._allCountries] }

  getAllCountries(){
    this.http.get<CountryRes[]>(`${this.apiUrl}/all`)
      .subscribe(res => this._allCountries = res.map(c => ({
        name: c.name.common,
        flag: c.flags.svg,
      })))
  }

  findOneCountry(country: string): Country | undefined {
    return this._allCountries.find(c => c.name === country);
  }

}
