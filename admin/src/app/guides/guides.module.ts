import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidesRoutingModule } from './guides-routing.module';
import { AllGuidesComponent } from './pages/all-guides/all-guides.component';
import { GuidesLayoutComponent } from './pages/guides-layout/guides-layout.component';
import { PrimengModule } from '../primeng/primeng.module';
import { GuidesFormComponent } from './components/guides-form/guides-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllGuidesComponent,
    GuidesLayoutComponent,
    GuidesFormComponent,
  ],
  imports: [
    CommonModule,
    GuidesRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  exports: [
    GuidesFormComponent,
  ]
})
export class GuidesModule { }
