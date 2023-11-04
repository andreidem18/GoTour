import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tours-form-layout',
  templateUrl: './tours-form-layout.component.html',
  styleUrls: ['./tours-form-layout.component.css']
})
export class ToursFormLayoutComponent {

  public items: MenuItem[] = [
    {
        label: 'Basic info',
        routerLink: 'basic-info'
    },
    {
        label: 'Images',
        routerLink: 'tour-images'
    },
    {
        label: 'Details',
        routerLink: 'details'
    },
    {
        label: 'Confirmation',
        routerLink: 'confirmation'
    }
  ]
}
