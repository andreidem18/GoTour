import { Component, OnInit, inject } from '@angular/core';
import { ToursFormService } from '../../services/tours-form.service';
import { generateMap } from 'src/app/shared/helpers/generateMapImage';
import { NewTour } from '../../interfaces';
import { readFile } from 'src/app/shared/helpers/readFile';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  private toursFormService = inject(ToursFormService);
  private router = inject(Router);


  get newTour() { return this.toursFormService.newTour }


  public mapImg: string = "";
  public imageCover: string = "";
  public tourImgs: string[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    
    if (!this.newTour.imageCover ) return;

    const filesObservables = this.newTour.tourImgs.map((file) => readFile(file));
    forkJoin([readFile(this.newTour.imageCover), ...filesObservables])
      .subscribe(res => {
        this.imageCover = res[0]
        this.tourImgs = res.slice(1);
      })
    
    if(!this.newTour.location) return
    const { lat, long } = this.newTour.location;
    this.mapImg = generateMap(lat, long);
    
  }

  createTour(){
    this.isLoading = true;
    this.toursFormService.createTour()
      .subscribe({
        next: (tour) => this.router.navigateByUrl(`/tours/${tour.id}/preview`),
        complete: () => this.isLoading = false
      })
  }

}
