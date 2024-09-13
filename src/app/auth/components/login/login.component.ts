import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter, Route, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (
    private router : Router
  ){}
}
