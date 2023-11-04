import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllToursComponent } from './pages/all-tours/all-tours.component';

const routes: Routes = [
  {
    path: "all-tours",
    component: AllToursComponent,
  },
  {
    path: "**",
    redirectTo: "all-tours",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
