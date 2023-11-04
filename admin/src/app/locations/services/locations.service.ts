import { Injectable, inject, signal } from '@angular/core';
import { Location } from '../interfaces/Location';
import { HttpClient } from '@angular/common/http';
import { environtment } from 'src/environments/environments';
import { Observable, catchError, tap } from 'rxjs';
import { CreateLocation } from '../interfaces/CreateLocation';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor() {
    this.getAllLocations();
  }
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = environtment.apiUrl;

  private _allLocations: Location[] = [];
  public locationSelected = signal<Location | null>(null);
  public lastLocationCreated = signal<Location | null>(null);

  get allLocations(){ return [...this._allLocations] }


  getAllLocations(): void {
    this.http.get<Location[]>(`${this.apiUrl}/locations`)
      .subscribe(res => this._allLocations = res);
  }


  createLocation(location: CreateLocation): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/locations`, location)
      .pipe(
        tap(res => this._allLocations.push(res)),
        tap(res => this.lastLocationCreated.set(res)),
        tap(() => this.messageService.add({
          severity: "success", 
          summary: "Location created successfully"
        })),
      )
  }

  deleteLocation(locationId: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/locations/${locationId}`)
      .pipe(
        tap(() => 
          this._allLocations = this._allLocations.filter(l => l.id !== locationId)
        ),
        tap(() => this.messageService.add({
          severity: "success",
          summary: "Location deleted successfully",
        }))
      )
  }

  selectLocation(location: Location){
    this.locationSelected.set(location);
  }

  updateLocation(location: CreateLocation){
    const id = this.locationSelected()!.id;
    return this.http.put<Location>(`${this.apiUrl}/locations/${id}`, location)
      .pipe(
        tap(res => {
          const index = this._allLocations.findIndex(l => l.id === id)
          this._allLocations[index] = res;
        }),
        tap(() => this.messageService.add({
          severity: "success",
          summary: "Location updated successfully",
        }))
      )
  }

}
