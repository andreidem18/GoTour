import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLocationsComponent } from './pages/all-locations/all-locations.component';
import { LocationsLayoutComponent } from './pages/locations-layout/locations-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsLayoutComponent,
    children: [
      {
        path: '',
        component: AllLocationsComponent,
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
