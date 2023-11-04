import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environtment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthStatus, AuthenticationRes } from '../interfaces';
import { User } from 'src/app/shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environtment.apiUrl;
  private _loggedUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.pending);
  public loggedUser = computed(() => this._loggedUser());
  public authStatus = computed(() => this._authStatus());


  private http = inject(HttpClient);

  doLogin(credentials: Credential): Observable<boolean>{
    return this.http.post<AuthenticationRes>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(res => this.authenticate(res)),
        map(() => true),
        catchError(() => {
          console.log("Error en servicio")
          this._authStatus.set(AuthStatus.unauthorized);
          return of(false);
        })
      )
  }

  getAuthorizationToken(): string {
    return localStorage.getItem('token') || '';
  }

  doAuthentication() {
    if(!localStorage.getItem("token")){
      this.logout();
      return;
    }
    this.http.get<AuthenticationRes>(`${this.apiUrl}/auth/renew`)
      .subscribe({
        next: res => this.authenticate(res),
        error: () => this.logout(),
      })
  }

  authenticate(authRes: AuthenticationRes){
    if(authRes.user.role !== 'admin') return this.logout();
    localStorage.setItem('token', authRes.token);
    this._authStatus.set(AuthStatus.authorized);
    this._loggedUser.set(authRes.user);
  }

  logout(){
    this._authStatus.set(AuthStatus.unauthorized);
    this._loggedUser.set(null);
    localStorage.setItem('token', '');
  }

}
