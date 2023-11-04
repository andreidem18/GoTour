import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/User';
import { environtment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GuidesService {

  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = environtment.apiUrl;
  // signal to recover the guide created
  public lastGuideCreated = signal<null | User>(null);

  private _allGuides: User[] = [];
  get allGuides(){ return this._allGuides }

  constructor() { 
    this.getAllGuides();
  }

  getAllGuides(){
    this.http.get<User[]>(`${this.apiUrl}/users?role=guide`)
      .subscribe(res => this._allGuides = res);
  }

  getGuideById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
  }

  createGuide(guideInfo: FormData): Observable<User>{

    return this.http.post<User>(`${this.apiUrl}/auth/signup`, guideInfo)
      .pipe(
        tap(res => {
          this.lastGuideCreated.set(res);
          this._allGuides.push(res);
          this.messageService.add({
            severity: 'success',
            summary: 'User created successfully'
          })
        }),
      )
  }

  deleteGuide(id: number){
    this.http.delete(`${this.apiUrl}/users/${id}`)
      .subscribe({
        next: () => {
          this._allGuides = this._allGuides.filter(g => g.id !== id);
        }
      })
  }

  updateGuide(guideInfo: FormData, id: number): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, guideInfo)
      .pipe(
        tap(res => {
          const index = this._allGuides.findIndex(g => g.id === id);
          this._allGuides[index] = res;
          this.messageService.add({
            severity: 'success',
            summary: 'User updated successfully'
          })
        }),
      )
  }
}
