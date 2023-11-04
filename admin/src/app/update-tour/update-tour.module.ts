import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateTourRoutingModule } from './update-tour-routing.module';
import { UpdateTourLayoutComponent } from './pages/update-tour-layout/update-tour-layout.component';
import { BasicInfoComponent } from './pages/basic-info/basic-info.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ImagesPageComponent } from './pages/images-page/images-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuidesModule } from '../guides/guides.module';
import { LocationsModule } from '../locations/locations.module';


@NgModule({
  declarations: [
    UpdateTourLayoutComponent,
    BasicInfoComponent,
    ImagesPageComponent,
    DetailsPageComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,

    UpdateTourRoutingModule,

    GuidesModule,
    LocationsModule,
  ]
})
export class UpdateTourModule { }
