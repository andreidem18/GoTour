import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourDetailPageComponent } from './pages/tour-detail-page/tour-detail-page.component';

const routes: Routes = [
  { path: ':id', component: TourDetailPageComponent },
  { path: '**', redirectTo: '/tours' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourDetailRoutingModule { }
