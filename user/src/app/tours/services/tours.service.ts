import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environtment } from 'src/environments/environments';
import { TourItem } from '../interfaces/TourItem';

interface Filters {
  [key: string]: string | string[] | number[]
  // name: string;
  // countries: string[];
  // price: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private http = inject(HttpClient)

  private apiUrl = environtment.apiUrl;

  private _toursList: TourItem[] = [];

  private initialFilters: Filters = {
    name: '',
    countries: '',
    price: [],
  }

  private filters: Filters = this.initialFilters;
  private _filtersTouched: boolean = false;

  get toursList(){ return [...this._toursList] }
  get filtersTouched(): boolean { return this._filtersTouched }

  constructor() {
    this.getAllTours();
  }

  getAllTours(): void {
    this.http.get<TourItem[]>(`${this.apiUrl}/tours`)
      .subscribe(res => this._toursList = res);
  }

  setFilter(name: string, value: string | string[] | number[]): void {
    this.filters[name] = value;
    // console.log(this.filters);
    // console.log(name, value);
    this.filterTours();
    this._filtersTouched = true;
  }

  filterTours(): void {
    this.http.get<TourItem[]>(`${this.apiUrl}/tours?${this.formatFilters()}`)
      .subscribe(res => {
        this._toursList = res;
      });
  }


  formatFilters(): string {
    const result = [];
    for(const property in this.filters){
      const value = this.filters[property as keyof Filters];
      if(!value || !value.length) continue;
      result.push(`${property}=${value}`)
    }
    return result.join('&')
  }

  clearFilters(): void {
    this.getAllTours();
    this.filters = {...this.initialFilters};
    this._filtersTouched = false;
  }


}
