import { Component, Input, inject } from '@angular/core';
import { Review } from '../../interfaces/Review';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewsFormService } from '../../services/reviews-form.service';

@Component({
  selector: 'review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent {

  @Input()
  public review!: Review;

  private confirmationService = inject(ConfirmationService);
  private reviewsService = inject(ReviewsService);
  private reviewsFormService = inject(ReviewsFormService);
  private messageService = inject(MessageService);

  deleteReview() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this review?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.reviewsService.deleteReview(this.review.id)
          .subscribe({ next: () => this.messageService.add({
            summary: "Review deleted successfully",
            severity: "success",
          })});
      }
    })
  }

  selectReview(){
    this.reviewsFormService.openForm({
      tour: this.review.tour,
      isUpdating: true,
      selectedReview: this.review,
    })
  }
  
}
