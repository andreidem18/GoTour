import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuidesService } from 'src/app/guides/services/guides.service';
import { Country, User } from 'src/app/shared/interfaces';
import { ToursService } from '../../../tours/services/tours.service';
import { LocationsService } from 'src/app/locations/services/locations.service';
import { Location } from 'src/app/locations/interfaces/Location';
import { CountriesService } from '../../../shared/services/countries.service';
import { Tour } from 'src/app/tours/interfaces/Tour';
import { ActivatedRoute } from '@angular/router';
import { switchMap, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent {

  private fb = inject(FormBuilder);
  private guidesService = inject(GuidesService);
  private locationsService = inject(LocationsService);
  private countriesService = inject(CountriesService);
  private toursService = inject(ToursService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  get allGuides(): User[] { return this.guidesService.allGuides }
  get allLocations(): Location[] { return this.locationsService.allLocations }
  get selectedGuide(): User | null {
    return this.myForm.get('guide')?.value;
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    guide: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
  })

  public tourId?: number;
  public showGuidesForm: boolean = false;
  public showLocationsForm: boolean = false;
  public tour?: Tour;
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.route.parent?.parent?.parent?.params
      .pipe(switchMap(params => {
        this.tourId = +params['id'];
        return this.toursService.getTourById(params['id'])
      }))
      .subscribe({
        next: tour => {
          this.tour = tour;
          this.setForm(tour);
        },
      })
  }

  setForm(tour: Tour) {
    const { guideId, location, name, description } = tour;
    this.guidesService.getGuideById(guideId)
      .subscribe(guide => this.myForm.setValue({ guide, location, name, description }))
  }

  getCountry(countryName: string): Country | null {
    return this.countriesService.allCountries
      .find(c => c.name === countryName) || null;
  }

  onSubmit() {
    if (!this.tourId) throw 'tourId required';
    this.isLoading = true;
    this.toursService.updateTour(this.tourId, this.myForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => this.messageService.add({
        severity: 'success',
        summary: 'Tour updated successfully',
      }))
      
  }
}
