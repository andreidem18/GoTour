import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuidesService } from 'src/app/guides/services/guides.service';
import { User } from 'src/app/shared/interfaces/User';
import { ToursFormService } from '../../services/tours-form.service';
import { BasicInfo, BasicInfoForm } from '../../interfaces';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/locations/services/locations.service';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { Country } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basic-info-page',
  templateUrl: './basic-info-page.component.html',
  styleUrls: ['./basic-info-page.component.css']
})
export class BasicInfoPageComponent {

  private guidesService = inject(GuidesService);
  private toursFormService = inject(ToursFormService);
  private locationsService = inject(LocationsService);
  private countriesService = inject(CountriesService);
  private fb = inject(FormBuilder);
  private router = inject(Router);


  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    guide: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
  })

  public showGuidesForm: boolean = false;
  public showLocationsForm: boolean = false;

  public setGuideEffect = effect(() => {
    const guideCreated = this.guidesService.lastGuideCreated();
    if(!guideCreated) return;
    this.myForm.get('guide')?.setValue(guideCreated);
  })

  public setLocationEffect = effect(() => {
    const locationCreated = this.locationsService.lastLocationCreated();
    if(!locationCreated) return;
    this.myForm.get('location')?.setValue(locationCreated);
  })

  get allGuides(){ return this.guidesService.allGuides }
  get selectedGuide(): User | null{
    return this.myForm.get('guide')?.value;
  }
  get allLocations(){ return this.locationsService.allLocations }

  getCountry(countryName: string): Country | null {
    return this.countriesService.allCountries
      .find(c => c.name === countryName) || null;
  }

  onSubmit(): void {
    this.toursFormService.addBasicInfo(this.myForm.value as BasicInfoForm);
    this.router.navigateByUrl('/tours-form/tour-images')
  }
  
}
