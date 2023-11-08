import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input()
  public isOpen: boolean = false;

  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  open() {
    this.isOpenChange.emit(true);
  }
}
