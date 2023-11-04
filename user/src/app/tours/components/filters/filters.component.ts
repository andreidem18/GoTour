import { Component, OnInit, inject } from '@angular/core';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from 'src/app/shared/interfaces';
import { ToursService } from '../../services/tours.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tours-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  private countriesService = inject(CountriesService);
  private toursService = inject(ToursService);

  public countrySelected = new FormControl(null);

  public usedCountries: string[] = [];

  get filtersTouched(): boolean {
    return this.toursService.filtersTouched;
  }

  get countriesList(): Country[] {
    return this.usedCountries.map<Country>(
      countryName => {
        const country = this.countriesService.allCountries.find(
          c => c.name === countryName
        )
        if(!country) throw "Country doesnt exists"
        return country;
      })
  }

  ngOnInit(): void {
    this.countriesService.getUsedCountries()
      .subscribe(res => this.usedCountries = res);

    this.countrySelected.valueChanges.subscribe(country => {
      if(!country) return;
      this.toursService.setFilter('country', country['name']);
    })
  }

  filterPrice(min?: number | null, max?: number | null): void {
    if(!min) min = 0;
    if(!max) max = 0;
    this.toursService.setFilter('price', [min, max]);
  }

  clearFilters(){
    this.toursService.clearFilters();
    this.countrySelected.setValue(null);
  }
}
