import { Component, OnInit, inject } from '@angular/core';
import { Review } from '../../interfaces/Review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-my-reviews-page',
  templateUrl: './my-reviews-page.component.html',
  styleUrls: ['./my-reviews-page.component.css']
})
export class MyReviewsPageComponent {

  private reviewsService = inject(ReviewsService);

  get reviews(): Review[] { return this.reviewsService.reviews }
}
