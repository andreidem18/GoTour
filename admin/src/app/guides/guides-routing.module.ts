import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllGuidesComponent } from './pages/all-guides/all-guides.component';
import { GuidesLayoutComponent } from './pages/guides-layout/guides-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GuidesLayoutComponent,
    children: [
      {
        path: 'all-guides',
        component: AllGuidesComponent
      },
      {
        path: '**',
        redirectTo: 'all-guides'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
