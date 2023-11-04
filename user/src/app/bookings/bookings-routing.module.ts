import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBookingsComponent } from './pages/all-bookings/all-bookings.component';

const routes: Routes = [
  { path: 'all-bookings', component: AllBookingsComponent },
  { path: '**', redirectTo: 'all-bookings' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
