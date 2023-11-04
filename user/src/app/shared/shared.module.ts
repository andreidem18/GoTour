import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrimengModule } from '../primeng/primeng.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
  ]
})
export class SharedModule { }
