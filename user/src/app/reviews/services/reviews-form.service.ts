import { Injectable, computed, inject, signal } from '@angular/core';
import { Review, TourReview } from '../interfaces/Review';
import { TourBooking } from 'src/app/bookings/interfaces/Booking';
import { OpenFormParams } from '../interfaces/OpenFormParams';
import { ReviewBody } from '../interfaces/ReviewBody';
import { ReviewsService } from './reviews.service';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ReviewsFormService {

  private reviewsService = inject(ReviewsService);

  private _isVisible = signal<boolean>(false);
  private _isUpdating = signal<boolean>(false);
  private _selectedReview = signal<Review | null>(null);

  // private _tour = signal<TourReview | null>(null);
  private _tour = signal<TourReview | TourBooking | null>({
    id: 32,
    name: "Perito Moreno Glacier Day Trip",
    imageCover: "http://res.cloudinary.com/ddflkwfsr/image/upload/v1687902048/academlo-tours/petito-cover.jpg",
    price: "100",
    location: {
      country: "Argentina"
    }
  });

  public isVisible = computed<boolean>(() => this._isVisible());
  public isUpdating = computed<boolean>(() => this._isUpdating());
  public selectedReview = computed<Review | null>(() => this._selectedReview());
  public tour = computed<TourReview | TourBooking | null>(() => this._tour());

  openForm(
    {tour, isUpdating = false, selectedReview = null}: OpenFormParams
  ): void {
    this._isVisible.set(true);
    this._tour.set(tour);
    this._isUpdating.set(isUpdating);
    this._selectedReview.set(selectedReview);
  }

  closeForm(): void {
    this._isVisible.set(false);
    this._tour.set(null);
    this._isUpdating.set(false);
    this._selectedReview.set(null);
  }

  submitReview(reviewBody: ReviewBody): Observable<Review> {
    let observable;
    if(this.isUpdating()){
      const id = this._selectedReview()!.id;
      observable = this.reviewsService.updateReview(id, reviewBody);
    } else {
      observable = this.reviewsService.createReview(reviewBody)
    }
    return observable
      .pipe(tap(() => this.closeForm()))
  }
}
