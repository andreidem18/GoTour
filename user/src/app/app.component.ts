import { Component, OnInit, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/authStatus.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'go-tours';

  private authService = inject(AuthService);
  private router = inject(Router);


  ngOnInit(): void {
    this.authService.authenticate();
  }

  isPending() {
    return this.authService.authStatus() === AuthStatus.pending;
  }

  // public authEffect = effect(() => {
  //   if(this.authService.authStatus() === AuthStatus.notAuthenticated){
  //     console.log("Me ejecute");
  //     this.router.navigateByUrl('/auth/login');
  //   }
  // })

}
