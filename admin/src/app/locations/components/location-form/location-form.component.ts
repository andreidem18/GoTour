import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, effect, inject } from '@angular/core';
import { CountriesService } from '../../../shared/services/countries.service';
import { Map, Marker } from 'mapbox-gl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { LocationForm } from '../../interfaces/LocationForm';

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements AfterViewInit, OnDestroy {

  @Input() isFormVisible: boolean = true;
  @Output() isFormVisibleChange = new EventEmitter<boolean>();
  @ViewChild('formMapContainer') formMapContainer!: ElementRef;
  
  private countriesService = inject(CountriesService);
  private locationsService = inject(LocationsService);
  private fb: FormBuilder = inject(FormBuilder);
  
  get countriesList(){ return this.countriesService.allCountries }
  
  public isLoading: boolean = false;
  public isUpdating: boolean = false;
  public isTypingLatLong: boolean = false;
  public map?: Map;

  public locationForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    country: [null, Validators.required],
    lat: [40, Validators.required],
    long: [-74.5, Validators.required],
  })

  get selectedCountry(){
    return this.locationForm.get('country')?.value;
  }


  public locationSelectedEffect = effect(() => {
    const locationSelected = this.locationsService.locationSelected();
    if(!locationSelected) {
      this.isUpdating = false;
      return
    };
    this.locationForm.reset({
      ...locationSelected, 
      country: this.countriesList.find(c => c.name === locationSelected.country),
    });
    this.map?.setCenter([locationSelected.long, locationSelected.lat])
    this.isUpdating = true;
  })


  ngAfterViewInit(): void {

    const lat = this.locationForm.get('lat');
    const long = this.locationForm.get('long');

    if(!lat || !long) return;

    this.map = new Map({
      container: this.formMapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 4,
      center: [long?.value, lat?.value]
    });
    const marker = new Marker().setLngLat(this.map.getCenter()).addTo(this.map);

    // When map is Clicked, change the lat and long values
    this.map.on('move', (e) => {
      const { lat: newLat, lng: newLong } = e.target.getCenter();
      this.isTypingLatLong = false;
      lat.setValue(newLat);
      long.setValue(newLong);
    });

    // When lat and long changes, change the center of the map
    lat.valueChanges.subscribe(v => latLngChanged(+v, +long.value))
    long.valueChanges.subscribe(v => latLngChanged(+lat.value, +v))

    const latLngChanged = (lat: number, long: number) => {
      console.log(this.isTypingLatLong);
      if(this.isTypingLatLong) this.map?.setCenter([long, lat]);
      marker.setLngLat([long, lat]);
    }
  }

  onInput(){ this.isTypingLatLong = true }

  ngOnDestroy(): void {
    this.map?.remove();
  }


  submit() {
    this.isLoading = true;
    const locationInfo: LocationForm = this.locationForm.value;
    const body = {
      ...locationInfo, 
      country: locationInfo.country.name
    }
    let service;
    if(this.isUpdating) service = this.locationsService.updateLocation(body)
    else service = this.locationsService.createLocation(body)
    service.subscribe({
      next: () => {
        this.closeForm();
        this.locationForm.reset();
      },
      complete: () => this.isLoading = false,
    })
  }


  closeForm(){
    this.isFormVisibleChange.emit(false);
    this.locationForm.reset();
    this.locationsService.locationSelected.set(null);
  }
}
