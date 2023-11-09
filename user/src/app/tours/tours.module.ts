import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToursRoutingModule } from './tours-routing.module';
import { AllToursComponent } from './pages/all-tours/all-tours.component';
import { PrimengModule } from '../primeng/primeng.module';
import { TourItemComponent } from './components/tour-item/tour-item.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HighlightedToursComponent } from './components/highlighted-tours/highlighted-tours.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AllToursComponent,
    TourItemComponent,
    FiltersComponent,
    HighlightedToursComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,

    ToursRoutingModule,

    SharedModule,
  ]
})
export class ToursModule { }
