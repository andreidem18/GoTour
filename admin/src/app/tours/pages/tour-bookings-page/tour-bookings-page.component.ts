import { Component, OnInit, inject } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Booking } from '../../interfaces/Booking';

@Component({
  selector: 'app-tour-bookings-page',
  templateUrl: './tour-bookings-page.component.html',
  styleUrls: ['./tour-bookings-page.component.css']
})
export class TourBookingsPageComponent implements OnInit {

  private toursService = inject(ToursService);
  private route = inject(ActivatedRoute);
  public bookings: Booking[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.route.parent?.params.pipe(
      switchMap(params => this.toursService.getTourBookings(params['id']))
    ).subscribe(bookings => {
      this.isLoading = false;
      this.bookings = bookings
    });
  }

}
