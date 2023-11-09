import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SliderComponent } from './components/slider/slider.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
  ],
  exports: [
    SliderComponent,
  ],
})
export class SharedModule { }
