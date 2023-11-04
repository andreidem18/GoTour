import { Component, OnInit, inject } from '@angular/core';
import { Review } from '../../interfaces/Review';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tour-reviews-page',
  templateUrl: './tour-reviews-page.component.html',
  styleUrls: ['./tour-reviews-page.component.css']
})
export class TourReviewsPageComponent implements OnInit {

  private toursService = inject(ToursService);
  private route = inject(ActivatedRoute);

  public reviews: Review[] = [];
  public isLoading: boolean = false;

  

  ngOnInit(): void {
    this.isLoading = true;
    this.route.parent?.params.pipe(
      switchMap(params => this.toursService.getTourReviews(params['id']))
    ).subscribe(reviews => {
      this.isLoading = false;
      this.reviews = reviews
    });
  }
}
