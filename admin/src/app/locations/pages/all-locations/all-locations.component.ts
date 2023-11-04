import { Component, inject } from '@angular/core';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent {

  private locationsService = inject(LocationsService);
  get allLocations(){ return this.locationsService.allLocations }

  public isFormVisible: boolean = false;

  changeFormVisible(visible: boolean){
    if(!visible) this.locationsService.locationSelected.set(null);
    this.isFormVisible = visible
  }

}
