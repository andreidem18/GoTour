import { Component, Input } from '@angular/core';
import { Tour } from '../../interfaces/Tour';

@Component({
  selector: 'tour-info',
  templateUrl: './tour-info.component.html',
  styleUrls: ['./tour-info.component.css']
})
export class TourInfoComponent {

  @Input()
  public tour!: Tour;
}
