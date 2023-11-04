import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../../services/tours.service';
import { switchMap } from 'rxjs';
import { Tour } from '../../interfaces/Tour';
import { generateMap } from 'src/app/shared/helpers/generateMapImage';
import { TourImg } from '../../interfaces/TourItem';

@Component({
  selector: 'app-tour-preview-page',
  templateUrl: './tour-preview-page.component.html',
  styleUrls: ['./tour-preview-page.component.css']
})
export class TourPreviewPageComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toursService = inject(ToursService);
  public tour?: Tour;
  public mapImg?: string;
  public allImages?: TourImg[];
  public isGalleryVisible: boolean = false;

  ngOnInit(): void {
    this.route.parent?.params
      .pipe(switchMap(params => {
        return this.toursService.getTourById(params['id'])
      }))
      .subscribe({
        next: tour => {
          this.tour = tour;
          // Adding cover image at the beginning
          this.allImages = [
            { id: 0, url: tour.imageCover, tourId: null },
            ...tour.tourImgs
          ]
          const { lat, long } = tour.location;
          this.mapImg = generateMap(lat, long);
        },
      })
  }

  showGallery(){
    this.isGalleryVisible = true;
  }

}
