import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as mapboxgl from 'mapbox-gl'; 
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYW5kcmVpZGVtMTgiLCJhIjoiY2xpaTQxaGR6MHN5ejN0cDc3N2l1NjR2MSJ9.g3P19w4DxcOoObK8i4-x2g';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule,
    PrimengModule,
    // SharedModule,
  ],
  providers: [
    httpInterceptorProviders,
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
