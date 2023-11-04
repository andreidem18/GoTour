import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToursRoutingModule } from './tours-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { AllToursPageComponent } from './pages/all-tours-page/all-tours-page.component';
import { TourItemComponent } from './components/tour-item/tour-item.component';
import { TourPreviewPageComponent } from './pages/tour-preview-page/tour-preview-page.component';
import { TourDetailLayoutComponent } from './pages/tour-detail-layout/tour-detail-layout.component';
import { TourBookingsPageComponent } from './pages/tour-bookings-page/tour-bookings-page.component';
import { TourReviewsPageComponent } from './pages/tour-reviews-page/tour-reviews-page.component';
import { BookingItemComponent } from './components/booking-item/booking-item.component';
import { TourReviewsChartComponent } from './components/tour-reviews-chart/tour-reviews-chart.component';
import { TourImagesGalleryComponent } from './components/tour-images-gallery/tour-images-gallery.component';


@NgModule({
  declarations: [
    AllToursPageComponent,
    TourItemComponent,
    TourPreviewPageComponent,
    TourDetailLayoutComponent,
    TourBookingsPageComponent,
    TourReviewsPageComponent,
    TourReviewsChartComponent,
    BookingItemComponent,
    TourImagesGalleryComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ToursRoutingModule,
  ]
})
export class ToursModule { }
