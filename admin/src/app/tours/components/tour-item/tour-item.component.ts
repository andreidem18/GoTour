import { Component, Input, inject } from '@angular/core';
import { TourItem } from '../../interfaces/TourItem';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from 'src/app/shared/interfaces';
import { ToursService } from '../../services/tours.service';

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
    console.log(this.tour);
    return this.countriesService
      .allCountries.find(c => c.name === this.tour.location.country)
  }

  get reviews(): number {
    const reviews = +this.tour.avgReviews
    return Math.round(reviews*10) / 10
  }
}
