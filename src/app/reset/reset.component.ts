import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  resetPassword(new_password: string, otp: string){
    
  }
}
