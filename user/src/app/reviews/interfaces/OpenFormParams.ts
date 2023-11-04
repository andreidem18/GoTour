import { TourBooking } from 'src/app/bookings/interfaces/Booking';
import { Review, TourReview } from './Review';

export interface OpenFormParams {
    tour: TourReview | TourBooking,
    isUpdating?: boolean,
    selectedReview?: Review | null,
}