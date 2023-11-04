import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../primeng/primeng.module';
import { TourDetailRoutingModule } from './tour-detail-routing.module';

import { TourDetailPageComponent } from './pages/tour-detail-page/tour-detail-page.component';
import { TourImagesGalleryComponent } from './components/tour-images-gallery/tour-images-gallery.component';
import { TourInfoComponent } from './components/tour-info/tour-info.component';
import { BookingOptionsComponent } from './components/booking-options/booking-options.component';
import { TourReviewsComponent } from './components/tour-reviews/tour-reviews.component';
import { TourReviewsChartComponent } from './components/tour-reviews-chart/tour-reviews-chart.component';
import { RecommendedToursComponent } from './components/recommended-tours/recommended-tours.component';


@NgModule({
  declarations: [
    TourDetailPageComponent,
    TourImagesGalleryComponent,
    TourInfoComponent,
    BookingOptionsComponent,
    TourReviewsComponent,
    TourReviewsChartComponent,
    RecommendedToursComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    PrimengModule,
    TourDetailRoutingModule,
  ]
})
export class TourDetailModule { }
