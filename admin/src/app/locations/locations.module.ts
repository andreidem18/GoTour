import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { AllLocationsComponent } from './pages/all-locations/all-locations.component';
import { LocationsLayoutComponent } from './pages/locations-layout/locations-layout.component';
import { PrimengModule } from '../primeng/primeng.module';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AllLocationsComponent,
    LocationsLayoutComponent,
    LocationCardComponent,
    LocationFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    SharedModule,
    PrimengModule,
    LocationsRoutingModule,
  ],
  exports: [
    LocationFormComponent,
  ]
})
export class LocationsModule { }
