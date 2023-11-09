import { Component, OnInit, inject } from '@angular/core';
import { HighlightedTour } from '../../interfaces/HighlightedTour';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'highlighted-tours',
  templateUrl: './highlighted-tours.component.html',
  styleUrls: ['./highlighted-tours.component.css']
})
export class HighlightedToursComponent implements OnInit {

  private toursService = inject(ToursService);
  public highlightedTours: HighlightedTour[] = [];

  ngOnInit(): void {
    this.toursService.getHighlightedTours()
      .subscribe(res => this.highlightedTours = res);
  }

  allTours() {
    const viewHeight = window.innerHeight
    window.scrollTo({ top: viewHeight, behavior: "smooth" });
  }
}
