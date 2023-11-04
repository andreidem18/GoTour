import { Component, Input, inject } from '@angular/core';
import { TourItem } from '../../interfaces/TourItem';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from 'src/app/shared/interfaces';

@Component({
  selector: 'tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.css']
})
export class TourItemComponent {

  @Input() 
  public tour!: TourItem;

  private countriesService = inject(CountriesService);

  get country(): Country | undefined {
    return this.countriesService
      .allCountries.find(c => c.name === this.tour.location.country)
  }


}
