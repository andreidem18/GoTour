import { Component, OnInit, effect, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/authStatus.enum';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  command?: () => void;
}

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private authService = inject(AuthService);

  get authStatus() { return this.authService.authStatus() }

  public items: MenuItem[] = [
    {
      label: 'Tours',
      icon: 'pi pi-fw pi-compass',
      routerLink: '/tours'
    },
    {
      label: 'My bookings',
      icon: 'pi pi-fw pi-calendar',
      routerLink: '/bookings'
    },
    {
      label: 'My reviews',
      icon: 'pi pi-fw pi-star',
      routerLink: '/reviews'
    },
  ];

  constructor() {
    this.setCloseItem();
  }

  authStatusEffect = effect(() => {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      this.items = this.items.filter(i => i.label !== 'Login');
      this.items.push({
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authService.logout();
        },
        routerLink: '/auth/login'
      })
    } else {
      this.items = this.items.filter(i => i.label !== 'Logout');
      this.items.push({
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: '/auth'
      })
    }
    this.setCloseItem();
  })

  public itemsCollapsed: boolean = true;

  toggleCollapsed() {
    this.itemsCollapsed = !this.itemsCollapsed;
  }

  setCloseItem() {
    this.items = this.items.map(item => ({
      ...item,
      command: () => {
        item.command?.();
        this.itemsCollapsed = true;
      },
    }))
  }
}
