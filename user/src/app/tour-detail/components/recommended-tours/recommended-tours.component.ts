import { Component, Input, OnInit, inject } from '@angular/core';
import { ToursService } from '../../../tours/services/tours.service';

@Component({
  selector: 'tour-recommended-tours',
  templateUrl: './recommended-tours.component.html',
  styleUrls: ['./recommended-tours.component.css']
})
export class RecommendedToursComponent implements OnInit {

  @Input()
  public country: string = "";
  @Input()
  public tourId: number = 0;

  private toursService = inject(ToursService);

  get toursList() { 
    return this.toursService.toursList.filter(t => t.id !== this.tourId);
  }

  ngOnInit(): void {
    this.toursService.setFilter("country", this.country);
  }
}
