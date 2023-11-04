import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environtment } from 'src/environments/environments';
import { TourImg, TourItem } from '../interfaces/TourItem';
import { Tour } from '../interfaces/Tour';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/Booking';
import { Review } from '../interfaces/Review';
import { MessageService } from 'primeng/api';
import { getFormData } from 'src/app/shared/helpers/getFormData';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor() { 
    this.getAllTours();
  }

  private _tours: TourItem[] = [];
  get tours() { return this._tours }

  private http = inject(HttpClient);
  private apiUrl = environtment.apiUrl;

  getAllTours(){
    return this.http.get<TourItem[]>(`${this.apiUrl}/tours`)
    .subscribe(res => {
        this._tours = res
      });
  }

  getTourById(id: string): Observable<Tour>{
    return this.http.get<Tour>(`${this.apiUrl}/tours/${id}`)
  }

  filterToursByName(name: string) {
    this.http.get<Tour[]>(`${this.apiUrl}/tours?name=${name}`)
      .subscribe(tours => this._tours = tours);
  }

  getTourBookings(id: string): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.apiUrl}/tours/${id}/bookings`)
  }

  getTourReviews(id: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/tours/${id}/reviews`)
  }

  addTour(tour: Tour){
    this._tours.push(tour);
  }

  addImages(images: {tourImgs: File[], tourId: number}) {
    const formData = getFormData(images);
    return this.http.post<TourImg[]>(`${this.apiUrl}/toursImgs`, formData);
  }

  deleteImage(imageId: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/toursImgs/${imageId}`)
  }

  updateTour(id: number, tourInfo: Partial<Tour> | FormData) {
    return this.http.put<Tour>(`${this.apiUrl}/tours/${id}`, tourInfo);
  }
}
