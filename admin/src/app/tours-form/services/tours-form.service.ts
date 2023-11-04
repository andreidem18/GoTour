import { Injectable, inject } from '@angular/core';
import { BasicInfo, BasicInfoForm, ImagesForm, NewTour } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environtment } from 'src/environments/environments';
import { Tour, TourImg } from 'src/app/tours/interfaces/Tour';
import { Observable, of, switchMap, tap } from 'rxjs';
import { DetailsForm } from '../interfaces/DetailsForm';
import { NewTourBody } from '../interfaces/NewTourBody';
import { getFormData } from 'src/app/shared/helpers/getFormData';
import { MessageService } from 'primeng/api';
import { ToursService } from 'src/app/tours/services/tours.service';

@Injectable({
  providedIn: 'root'
})
export class ToursFormService {

  private apiUrl = environtment.apiUrl;
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private toursService = inject(ToursService);

  private _newTour: NewTour = {
    name:         '',
    description:  '',
    duration:     '',
    maxGroupSize: 0,
    difficulty:   'easy',
    price:        0,
    imageCover:   null,
    tourImgs:     [],
    location:     null,
    guide:        null,
  };

  get newTour() { return this._newTour }

  constructor() { }


  createTour() {
    const { guide, location, ...tour } = this._newTour;
    if(!guide || !location) throw "Guide and location must bu defined";
    const body: NewTourBody = {...tour, guideId: guide?.id, locationId: location?.id}
    const formData = getFormData(body);
    return this.http.post<Tour>(`${this.apiUrl}/tours`, formData)
      .pipe(
        switchMap(res => this.http.get<Tour>(`${this.apiUrl}/tours/${res.id}`)),
        tap((res) => this.toursService.addTour(res)),
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Tour created successfully'
        }))
      )
  }

  addBasicInfo(basicInfo: BasicInfoForm) {
    this._newTour = { ...this._newTour, ...basicInfo }
  }

  setImages(imagesForm: ImagesForm) {
    this._newTour = { ...this._newTour, ...imagesForm }
  }

  addDetails(details: DetailsForm) {
    this._newTour = { ...this._newTour, ...details }
  }

  uploadTourImages(tourImages: FormData): Observable<TourImg[]> {
    return this.http.post<TourImg[]>(`${this.apiUrl}/toursImgs`, tourImages)
  }

  deleteTourImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/toursImgs/${imageId}`)
  }
}
