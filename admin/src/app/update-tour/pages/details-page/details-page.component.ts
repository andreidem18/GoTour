import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToursService } from '../../../tours/services/tours.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private toursService = inject(ToursService);
  private route = inject(ActivatedRoute);

  public detailsForm: FormGroup = this.fb.group({
    price: ['', Validators.required],
    duration: ['', Validators.required],
    maxGroupSize: ['', Validators.required],
    difficulty: ['', Validators.required],
  })

  public difficulties = ["easy", "medium", "hard"];
  public tourId?: number;

  ngOnInit(): void {
    this.route.parent?.parent?.parent?.params
      .pipe(switchMap(params => {
        this.tourId = +params['id'];
        return this.toursService.getTourById(params['id'])
      }))
      .subscribe({
        next: tour => {
          const { price, duration, maxGroupSize, difficulty, ..._ } = tour;
          this.detailsForm.setValue({price, duration, maxGroupSize, difficulty});
        },
      })
  }

  onSubmit(){
    if (!this.tourId) return;
    this.toursService.updateTour(this.tourId, this.detailsForm.value)
      .subscribe(() => this.messageService.add({
        severity: 'success',
        summary: 'Saved!',
        detail: 'Tour details succesfully updated',
      }))
  }
}
