import { Component, inject } from '@angular/core';
import { ToursService } from '../../../tours/services/tours.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourImg } from 'src/app/tours/interfaces/TourItem';
import { getFormData } from 'src/app/shared/helpers/getFormData';

@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.css']
})
export class ImagesPageComponent {

  private toursService = inject(ToursService);
  private route = inject(ActivatedRoute);
  


  public imageCover?: string;
  public tourImgs: TourImg[] = [];
  public tourId?: number;


  ngOnInit(): void {
    const tourId = this.route.parent?.parent?.parent?.snapshot.paramMap.get('id') || '';
    this.tourId = +tourId;
    this.toursService.getTourById(tourId)
      .subscribe(tour => {
        this.imageCover = tour.imageCover;
        this.tourImgs = tour.tourImgs;
      })
  }


  async uploadCover(event: Event) {
    if (!event || !this.tourId) return;
    const file = (event.target as HTMLInputElement).files![0];
    const formData = getFormData({ imageCover: file });
    this.toursService.updateTour(this.tourId, formData)
      .subscribe(tour => this.imageCover = tour.imageCover);
  }

  uploadImages(event: Event) {
    const target = (event.target as HTMLInputElement)
    const files = target.files;
    if (!files || !this.tourId) return;
    this.toursService.addImages({ 
      tourImgs: Array.from(files), 
      tourId: this.tourId 
    })
      .subscribe(images => {
        this.tourImgs = [...this.tourImgs, ...images];
      });
    target.value = "";
  }

  

  removeImage(imageId: number) {
    this.toursService.deleteImage(imageId)
      .subscribe(() => {
        this.tourImgs = this.tourImgs.filter(img => img.id !== imageId)
      })
  }

  submit() {
    
  }

}
