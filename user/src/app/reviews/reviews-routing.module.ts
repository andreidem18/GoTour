import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { MyReviewsPageComponent } from './pages/my-reviews-page/my-reviews-page.component';
import { PendingReviewsPageComponent } from './pages/pending-reviews-page/pending-reviews-page.component';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'all', component: MyReviewsPageComponent },
      { path: 'pending', component: PendingReviewsPageComponent },
      { path: '**', redirectTo: 'all' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
