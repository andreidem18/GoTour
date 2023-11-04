import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { LocationsService } from '../../services/locations.service';
import { ConfirmationService } from 'primeng/api';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { environtment } from 'src/environments/environments';
import { getRandomColor } from 'src/app/shared/helpers/getRandomColor';
import { generateMap } from 'src/app/shared/helpers/generateMapImage';

@Component({
  selector: 'location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit {

  @Input()
  public location!: Location;
  @Output()
  public showForm = new EventEmitter<boolean>();
  
  
  private locationsService = inject(LocationsService);
  private confirmationService = inject(ConfirmationService);
  private countriesService = inject(CountriesService);
  public locationMap: string = "";


  get country(){
    return this.countriesService
      .allCountries.find(c => c.name === this.location.country)
  }

  
  ngOnInit(): void {
    if(!location){
      throw 'You must send a location'
    }
    const { lat, long } = this.location;
    this.locationMap = generateMap(lat, long);
  }
  

  onDelete(){
    this.confirmationService.confirm({
      message: 'Do you want to delete this location?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => this.locationsService.deleteLocation(this.location.id)
        .subscribe(),
    })
  }


  onUpdate(){
    this.locationsService.selectLocation(this.location);
    this.showForm.emit(true);
  }

}
