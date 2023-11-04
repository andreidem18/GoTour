import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursFormRoutingModule } from './tours-form-routing.module';
import { BasicInfoPageComponent } from './pages/basic-info-page/basic-info-page.component';
import { ToursFormLayoutComponent } from './pages/tours-form-layout/tours-form-layout.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GuidesModule } from '../guides/guides.module';
import { LocationsModule } from '../locations/locations.module';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { TourImagesPageComponent } from './pages/tour-images-page/tour-images-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';


@NgModule({
  declarations: [
    BasicInfoPageComponent,
    ToursFormLayoutComponent,
    DetailsPageComponent,
    TourImagesPageComponent,
    ConfirmationPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ToursFormRoutingModule,
    PrimengModule,

    GuidesModule,
    LocationsModule,
  ]
})
export class ToursFormModule { }
