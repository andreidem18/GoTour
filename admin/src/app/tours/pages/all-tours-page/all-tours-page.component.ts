import { Component, OnInit, inject } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-all-tours-page',
  templateUrl: './all-tours-page.component.html',
  styleUrls: ['./all-tours-page.component.css']
})
export class AllToursPageComponent implements OnInit {

  private toursService = inject(ToursService);
  public inputSearch = new FormControl('');

  get tours(){
    return this.toursService.tours;
  }

  ngOnInit(): void {
    this.inputSearch.valueChanges.pipe(debounceTime(300))
      .subscribe(value => {
        if (!value) {
          this.toursService.getAllTours();
          return
        }
        this.toursService.filterToursByName(value);
      });
  }
}
