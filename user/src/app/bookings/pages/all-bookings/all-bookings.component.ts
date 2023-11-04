import { Component, OnInit, inject } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../interfaces/Booking';

interface Severity {
  text: string;
  severity: string;
}

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  private bookingsService = inject(BookingsService);

  public bookings: Booking[] = [];

  ngOnInit(): void {
    this.bookingsService.getBookings()
      .subscribe(res => this.bookings = res);
  }

  getSeverity(booking: Booking): Severity {

    const bookingDate = new Date(booking.date);
    const today = new Date();

    if(bookingDate < today){
      return {
        text: "Completed",
        severity: "primary"
      }
    }
    return {
      text: "Pending",
      severity: "success"
    }

  };

}
