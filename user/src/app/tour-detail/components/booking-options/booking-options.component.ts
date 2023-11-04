import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {addDaysToDate} from 'src/app/shared/helpers/addDaysToDate';
import { TourDetailService } from '../../services/tour-detail.service';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { NewBooking } from 'src/app/bookings/interfaces/NewBooking';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from 'src/app/auth/interfaces/authStatus.enum';

@Component({
  selector: 'tour-booking-options',
  templateUrl: './booking-options.component.html',
  styleUrls: ['./booking-options.component.css']
})
export class BookingOptionsComponent {

  private fb = inject(FormBuilder);
  private tourDetailService = inject(TourDetailService);
  private bookingsService = inject(BookingsService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  public isLoading: boolean = false;

  public bookingsForm = this.fb.group({
    peopleNumber: [2],
    date: addDaysToDate(new Date(), 7),
  });

  get tourPrice() {
    return +(this.tourDetailService.tour?.price || 0);
  }
  get peopleNumber(): number | undefined | null {
    return this.bookingsForm.get('peopleNumber')?.value
  }
  get totalPrice() {
    if (!this.tourPrice || !this.peopleNumber) return 0
    return this.tourPrice * this.peopleNumber;
  }

  public peopleNumberOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];


  submit(){

    if(this.authService.authStatus() !== AuthStatus.authenticated){
      this.router.navigateByUrl('/auth/login');
      this.messageService.add({ 
        severity: 'info', 
        summary: 'You must be logged in order to booking a tour'
      });
      return;
    }

    this.isLoading = true;
    const tourId = this.tourDetailService.tourId();
    const booking = { ...this.bookingsForm.value, tourId }
    if(!booking.date || !booking.peopleNumber) return;
    this.bookingsService.createBooking(booking as NewBooking)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({ next: () => {
        this.router.navigateByUrl('/bookings');
        this.messageService.add({
          severity: 'success',
          summary: 'Booking created!'
        })
      }})
  }
}
