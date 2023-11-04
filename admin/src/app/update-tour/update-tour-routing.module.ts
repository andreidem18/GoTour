import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTourLayoutComponent } from './pages/update-tour-layout/update-tour-layout.component';
import { BasicInfoComponent } from './pages/basic-info/basic-info.component';
import { ImagesPageComponent } from './pages/images-page/images-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateTourLayoutComponent,
    children: [
      {
        path: 'basic',
        component: BasicInfoComponent
      },
      {
        path: 'images',
        component: ImagesPageComponent
      },
      {
        path: 'details',
        component: DetailsPageComponent
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateTourRoutingModule { }
