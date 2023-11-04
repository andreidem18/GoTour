import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourDetailService } from '../../services/tour-detail.service';
import { Tour, TourImg } from '../../interfaces/Tour';
import { generateMap } from 'src/app/shared/helpers/generateMap';

@Component({
  selector: 'app-tour-detail-page',
  templateUrl: './tour-detail-page.component.html',
  styleUrls: ['./tour-detail-page.component.css']
})
export class TourDetailPageComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private tourDetailService = inject(TourDetailService);
  
  public averageRating: number = 0;
  public isGalleryVisible: boolean = false;
  public allImages: TourImg[] = [];

  get tour(): Tour | null { 
    const tour = this.tourDetailService.tour;
    if(!tour) return null;
    this.allImages = [
      { id: 0, url: tour.imageCover, tourId: null },
      ...tour.tourImgs
    ]
    this.averageRating = this.tourDetailService.getStarsAverage();
    return this.tourDetailService.tour;
  }

  get mapImg(): string { return this.tourDetailService.mapImg }
  get isLoading(): boolean { return this.isLoading };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourDetailService.setId(params['id']);
      window.scrollTo(0, 0);
    })
  }
  
  showGallery(){
    this.isGalleryVisible = true;
  }
}
