import { Component, inject } from '@angular/core';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { ReviewsService } from '../../services/reviews.service';
import { TourReview } from '../../interfaces/Review';
import { ReviewsFormService } from '../../services/reviews-form.service';
import { Booking, TourBooking } from 'src/app/bookings/interfaces/Booking';

@Component({
  selector: 'app-pending-reviews-page',
  templateUrl: './pending-reviews-page.component.html',
  styleUrls: ['./pending-reviews-page.component.css']
})
export class PendingReviewsPageComponent {

  private bookingsService = inject(BookingsService);
  private reviewsService = inject(ReviewsService);
  private reviewsFormService = inject(ReviewsFormService);

  get pendingReviews(): Booking[] {
    const reviews = this.reviewsService.reviews;
    return this.bookingsService.bookings.filter(b => {
      const notReview = !reviews.some(r => r.tourId === b .tourId)
      const isCompleted = new Date(b.date) < new Date();
      return notReview && isCompleted;
    });
  }

  openForm(tour: TourBooking){
    this.reviewsFormService.openForm({ tour });
  }
}
