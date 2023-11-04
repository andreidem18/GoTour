import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { readFile } from 'src/app/shared/helpers/readFile';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  public imageURL: string = '';
  public isLoading: boolean = false;

  public userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    photo: [null],
  });

  ngOnInit(): void {
    this.userForm.get('photo')?.valueChanges
      .pipe(switchMap(v => readFile(v)))
      .subscribe(url => this.imageURL = url)
  }

  uploadFile(event: Event) {
    if(!event) return;
    const file = (event.target as HTMLInputElement).files![0]
    this.userForm.patchValue({
      photo: file
    });
    this.userForm.get('photo')!.updateValueAndValidity();
  }

  submit(){
    this.isLoading = true;
    this.authService.createUser(this.userForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.messageService.add({
            summary: "User created",
            detail: "Login with your new user",
            severity: "success",
          });
          this.router.navigateByUrl('/auth/login');
        }
      })
  }
}
