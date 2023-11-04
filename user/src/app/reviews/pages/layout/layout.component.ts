import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public items: MenuItem[] = [
    {
      label: 'Created',
      icon: 'pi pi-fw pi-star',
      routerLink: '/reviews/all',
    },
    {
      label: 'Pending',
      icon: 'pi pi-fw pi-clock',
      routerLink: '/reviews/pending',
    },
  ];

}
