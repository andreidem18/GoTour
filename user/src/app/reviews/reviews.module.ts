import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { MyReviewsPageComponent } from './pages/my-reviews-page/my-reviews-page.component';
import { PendingReviewsPageComponent } from './pages/pending-reviews-page/pending-reviews-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsFormModalComponent } from './components/reviews-form-modal/reviews-form-modal.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';


@NgModule({
  declarations: [
    MyReviewsPageComponent,
    PendingReviewsPageComponent,
    LayoutComponent,
    ReviewsFormModalComponent,
    ReviewItemComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReviewsModule { }
