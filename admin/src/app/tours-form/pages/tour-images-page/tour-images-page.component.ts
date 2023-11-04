import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToursFormService } from '../../services/tours-form.service';
import { Observable, Observer, forkJoin, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
// import 'src/assets/no-image.svg'
import { readFile } from '../../../shared/helpers/readFile';

@Component({
  selector: 'app-tour-images-page',
  templateUrl: './tour-images-page.component.html',
  styleUrls: ['./tour-images-page.component.css']
})
export class TourImagesPageComponent implements OnInit {

  private toursFormService = inject(ToursFormService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public imagesForm: FormGroup = this.fb.group({
    imageCover: [null, Validators.required],
    tourImgs: [[]],
  })

  public imageCoverPreview?: string;
  public tourImgsPreview: string[] = [];


  ngOnInit(): void {
    this.imagesForm.get('imageCover')?.valueChanges
      .pipe(switchMap(file => readFile(file)))
      .subscribe(image => {
        this.imageCoverPreview = image
      });

    this.imagesForm.get('tourImgs')?.valueChanges
      .pipe(switchMap((images: File[]) => {
        const observables = images.map(image => {
          return readFile(image);
        })
        return observables.length ? forkJoin(observables) : of([]);
      }))
      .subscribe(images => {
        this.tourImgsPreview = images;
      })
  }


  async showCoverPreview(event: Event) {
    if (!event) return;
    const file = (event.target as HTMLInputElement).files![0];
    this.imagesForm.patchValue({
      imageCover: file
    });
    this.imagesForm.get('imageCover')!.updateValueAndValidity();
  }

  showImagesPreview(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    const tourImgs = this.imagesForm.get('tourImgs');
    if(!tourImgs) return;
    this.imagesForm.patchValue({
      tourImgs: tourImgs.value.concat(Array.from(files)),
    })
    tourImgs.updateValueAndValidity();
  }

  

  removeImage(index: number) {
    const images = this.imagesForm.get('tourImgs');
    if(!images) return;
    const imagesFiltered = (images.value as string[]).filter((_, i) => i !== index);
    images.setValue(imagesFiltered);
  }

  submit() {
    this.toursFormService.setImages(this.imagesForm.value);
    this.router.navigateByUrl('/tours-form/details');
  }
}
