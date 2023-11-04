import { Component, OnInit, inject, effect, computed } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.doAuthentication();
  }

  public finishedAuthStatus = computed<boolean>(() => {
    if(this.authService.authStatus() === AuthStatus.pending){
      return false;
    } 
    return true;
  })

  authEffect = effect(() => {
    console.log(this.authService.authStatus())
    switch (this.authService.authStatus()) {
      case AuthStatus.unauthorized:
        this.router.navigateByUrl('/auth/login');
        break;
      
      // case AuthStatus.authorized:
      //   this.router.navigateByUrl('/tours');
      //   break;
        
      default:
        break;
    }
  });

}
