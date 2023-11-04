import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  public messages: Message[] = [];
  public isLoading: boolean = false;
  public testData = {
    email: 'daniel@gmail.com',
    password: 'daniel1234'
  }

  public loginForm = this.fb.group({
    email: ['', [ Validators.required ] ],
    password: ['', [ Validators.required ] ],
  })

  onSubmit(){
    this.isLoading = true;
    this.authService.doLogin(this.loginForm.value as Credential)
      .subscribe({
        next: (isValid) => {
          if(isValid) {
            this.router.navigateByUrl('/tours');
            this.messages = [];
            return;
          }
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid credentials' }];
        },
        complete: () => this.isLoading = false,
      })
  }

  fillWithTestData() {
    this.loginForm.setValue(this.testData);
  }
}
