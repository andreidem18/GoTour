import { Component, effect, inject } from '@angular/core';
import { ReviewsFormService } from '../../services/reviews-form.service';
import { TourReview } from '../../interfaces/Review';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewBody } from '../../interfaces/ReviewBody';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'reviews-form-modal',
  templateUrl: './reviews-form-modal.component.html',
  styleUrls: ['./reviews-form-modal.component.css']
})
export class ReviewsFormModalComponent {

  private reviewsFormService = inject(ReviewsFormService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);


  public reviewsForm: FormGroup = this.fb.group({
    rating: [0, Validators.required],
    description: [''],
  })

  public reviewSelectedEffect = effect(() => {
    const selectedReview = this.reviewsFormService.selectedReview();
    if(!selectedReview){
      this.reviewsForm.reset();
      return;
    }
    this.reviewsForm.reset(selectedReview);
  })

  public isLoading: boolean = false;


  get isVisible(): boolean { return this.reviewsFormService.isVisible() }
  get tour(): TourReview | null { return this.reviewsFormService.tour() }
  get isUpdating(): boolean { return this.reviewsFormService.isUpdating() }

  closeForm(){
    this.reviewsFormService.closeForm();
  }

  submit(){
    if(!this.tour) return;
    const isUpdating = this.isUpdating;
    this.isLoading = true;
    const reviewBody: ReviewBody = {
      ...this.reviewsForm.value,
      tourId: this.tour.id
    }
    this.reviewsFormService.submitReview(reviewBody)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: isUpdating 
              ? 'Review updated successfully' 
              : 'Review added successfully!'
          });
          this.router.navigateByUrl('/reviews/all');
          this.reviewsForm.reset();
        }
      })
  }
}
