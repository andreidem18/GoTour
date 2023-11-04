import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToursFormService } from '../../services/tours-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPageComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toursFormService = inject(ToursFormService);

  public detailsForm: FormGroup = this.fb.group({
    price: ['', Validators.required],
    duration: ['', Validators.required],
    maxGroupSize: ['', Validators.required],
    difficulty: ['', Validators.required],
  })

  public difficulties = ["easy", "medium", "hard"];

  onSubmit(){
    this.toursFormService.addDetails(this.detailsForm.value);
    this.router.navigateByUrl('/tours-form/confirmation')
  }

}
