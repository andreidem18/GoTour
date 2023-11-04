import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../interfaces/Booking';

interface Tag {
  value:    string;
  severity: string;
}

@Component({
  selector: 'tours-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit{

  @Input()
  public booking!: Booking;

  public tag?: Tag;
  ngOnInit(): void {
    this.tag = this.getTag();
  }

  getTag(): Tag {
    const today = new Date();
    const bookingDate = new Date(this.booking.date);
    if(bookingDate < today){
      return {
        value: 'fulfilled',
        severity: 'primary'
      }
    }
    return {
      value: 'pending',
      severity: 'success'
    }
  }

}
