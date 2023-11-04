import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { AllBookingsComponent } from './pages/all-bookings/all-bookings.component';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    AllBookingsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    PrimengModule,
  ]
})
export class BookingsModule { }
