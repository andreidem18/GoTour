import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../interfaces/Credentials';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  public isLoading: boolean = false;
  public testData = {
    email: 'walter@gmail.com',
    password: 'walter1234'
  }

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  submit(): void {
    this.isLoading = true;
    this.authService.login(this.loginForm.value as Credentials)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/tours');
          this.messageService.add({
            severity: 'success',
            summary: `Welcome ${res.user.name}!`,
            closable: false,
            life: 1
          })
        },
        error: () => {
          this.messageService.add({
            summary: 'Invalid credentials',
            severity: 'error',
          })
        }
      })
  }

  fillWithTestData() {
    this.loginForm.setValue(this.testData);
  }
  
}
