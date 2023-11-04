import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { GetCountryFlagPipe } from './pipes/get-country-flag.pipe';



@NgModule({
  declarations: [
    MainLayoutComponent,
    SideMenuComponent,
    GetCountryFlagPipe
  ],
  imports: [
    CommonModule,
    PrimengModule,

  ],
  exports: [
    GetCountryFlagPipe,
  ]
})
export class SharedModule { }
