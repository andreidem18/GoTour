import { Component, OnInit, inject } from '@angular/core';
import { ToursModule } from '../../tours.module';
import { ToursService } from '../../services/tours.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css']
})
export class AllToursComponent implements OnInit {

  private toursService = inject(ToursService);

  public tourNameSearch = new FormControl('');

  public filtersSidebarVisible: boolean = false;

  get toursList() { return this.toursService.toursList }

  ngOnInit(): void {
    this.toursService.clearFilters();
  }

  searchName(): void {
    if(!this.tourNameSearch.value) return;
    this.toursService.setFilter('name', this.tourNameSearch.value);
  }

  openFiltersSidebar() {
    this.filtersSidebarVisible = true;
  }
}
