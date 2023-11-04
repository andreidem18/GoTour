import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TourImg } from '../../interfaces/TourItem';

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
}

@Component({
  selector: 'tour-images-gallery',
  templateUrl: './tour-images-gallery.component.html',
  styleUrls: ['./tour-images-gallery.component.css']
})
export class TourImagesGalleryComponent {

  @Input()
  public images: TourImg[] = []

  @Input()
  public isGalleryVisible: boolean = false;

  @Output()
  public isGalleryVisibleChange = new EventEmitter<boolean>();

  responsiveOptions: ResponsiveOption[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  visibleChanges(visibility: boolean){
    this.isGalleryVisibleChange.emit(visibility);
  }
}
