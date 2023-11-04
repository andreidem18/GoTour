import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country, CountryRes } from '../interfaces';
import { environtment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() {
    this.getAllCountries();
  }
  private http = inject(HttpClient);
  private countriesApiUrl = 'https://restcountries.com/v3.1';
  private toursApiUrl = environtment.apiUrl;

  private _allCountries: Country[] = [];
  get allCountries(){ return [...this._allCountries] }

  getAllCountries(){
    this.http.get<CountryRes[]>(`${this.countriesApiUrl}/all`)
      .subscribe(res => this._allCountries = res.map(c => ({
        name: c.name.common,
        flag: c.flags.svg,
      })))
  }

  findOneCountry(country: string): Country | undefined {
    return this._allCountries.find(c => c.name === country);
  }

  getUsedCountries(): Observable<string[]>{
    return this.http.get<string[]>(`${this.toursApiUrl}/locations/countries`)
  }

}
