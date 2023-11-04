import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tour-detail-layout',
  templateUrl: './tour-detail-layout.component.html',
  styleUrls: ['./tour-detail-layout.component.css']
})
export class TourDetailLayoutComponent {

  public items: MenuItem[] = [
    { label: 'Preview', icon: 'pi pi-fw pi-eye', routerLink: 'preview' },
    { label: 'Bookings', icon: 'pi pi-fw pi-list', routerLink: 'bookings' },
    { label: 'Reviews', icon: 'pi pi-fw pi-star-fill', routerLink: 'reviews' },
    { label: 'Update', icon: 'pi pi-fw pi-pencil', routerLink: 'update' },
  ];
}
