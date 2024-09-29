import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavActive: boolean = false;

  isLoggedIn: boolean = false;

  constructor(
  ) {}

  ngOnInit(){
    this.isLoggedIn = this.checkIfLoggedIn();
  }

  checkIfLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') !== null;
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }


}