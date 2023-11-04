import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  private authService = inject(AuthService);

  public options: MenuItem[] = [
    { 
      label: 'All tours', 
      icon: 'pi pi-fw pi-list',
      routerLink: '/tours/all-tours',
    },
    { 
      label: 'Create new tour', 
      icon: 'pi pi-fw pi-plus',
      routerLink: '/tours-form',
    },
    { 
      label: 'Guides', 
      icon: 'pi pi-fw pi-users', 
      routerLink: '/guides',
    },
    {
      label: 'Locations',
      icon: 'pi pi-fw pi-map-marker',
      routerLink: '/locations',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      // routerLink: '/tours/users',
      command: () => this.authService.logout(),
    }
  ]

}
