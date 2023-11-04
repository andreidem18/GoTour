import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-update-tour-layout',
  templateUrl: './update-tour-layout.component.html',
  styleUrls: ['./update-tour-layout.component.css']
})
export class UpdateTourLayoutComponent {

  public items: MenuItem[] = [
    {
      label: 'Basic info',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: 'basic'
    },
    {
      label: 'Images',
      icon: 'pi pi-fw pi-image',
      routerLink: 'images'
    },
    {
      label: 'Details',
      icon: 'pi pi-fw pi-file-edit',
      routerLink: 'details'
    }
  ]
}
