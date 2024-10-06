import { Component, OnInit } from '@angular/core';
import { CurrentUserModel } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavActive: boolean = false;

  isLoggedIn: boolean = false;

  userHere: CurrentUserModel | null = null;

  userId: number | undefined;

  isUserAdmin: boolean = false;



  constructor(
    private router: Router
  ) {}

  ngOnInit(){
    this.isLoggedIn = this.checkIfLoggedIn();

    if (typeof localStorage !== 'undefined') {

      this.userHere = JSON.parse(localStorage.getItem('currentUser') || '{}');

      this.userId = this.userHere?.id;
    

    }

    this.isUserAdmin = this.checkIfUserAdmin();
  }

  openProfile(){
    this.router.navigate([`/profile/${this.userId}`]);
  }

  checkIfLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') !== null;
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }

  checkIfUserAdmin(): boolean {
    if(this.userHere?.role === 'Admin') {
      return true;
    } else {
      return false
  }
}


}