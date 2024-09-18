import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavActive: boolean = false;

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }
}