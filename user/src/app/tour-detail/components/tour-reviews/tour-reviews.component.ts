import { Component, OnInit, inject } from '@angular/core';
import { Review } from '../../interfaces/Review';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TourDetailService } from '../../services/tour-detail.service';

@Component({
  selector: 'tour-reviews',
  templateUrl: './tour-reviews.component.html',
  styleUrls: ['./tour-reviews.component.css']
})
export class TourReviewsComponent implements OnInit {

  private toursService = inject(TourDetailService);

  public reviews: Review[] = [];
  public isLoading: boolean = false;

  

  ngOnInit(): void {
    this.isLoading = true;
    this.toursService.getTourReviews()
      .subscribe(reviews => {
        this.isLoading = false;
        this.reviews = reviews;
      });
  }
}
