import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToursRoutingModule } from './tours-routing.module';
import { AllToursComponent } from './pages/all-tours/all-tours.component';
import { PrimengModule } from '../primeng/primeng.module';
import { TourItemComponent } from './components/tour-item/tour-item.component';
import { FiltersComponent } from './components/filters/filters.component';


@NgModule({
  declarations: [
    AllToursComponent,
    TourItemComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,

    ToursRoutingModule
  ]
})
export class ToursModule { }
