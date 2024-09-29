import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter, Route, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import UserModel from '../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import loginData from '../../../shared/models/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  token: string = '';

  userId: number = 0;


  constructor (
    private router : Router,
    private auth: AuthService,
    private dialog: MatDialog
  ){}

  async logUser() {
    if (this.email && this.password) {
      this.auth.logUser(this.email, this.password).subscribe({
        next: async (response: loginData) => {
          const { data } = response;
          const { result } = data;
          const { user, token } = result;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('access_token', token);
          await this.openConfirmDialog('Login Successful', 'Logged in successfully! Redirecting to home page...');
          window.location.href = '/home';


        },
        error: error => {
          console.error('Error:', error);
          if (error.error.type == "NotFoundException") {
            this.openErrorDialog("An error occurred", "User not found");
          }
        }
      });
    }
  }

  extractErrorMessage(errorTitle: string): string {
    const match = errorTitle.match(/: (.*?)(?= Severity:)/);
    return match ? match[1].trim() : '';
  }
  

  openErrorDialog(title: string, message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title, message },
    });
  }

  openConfirmDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title, message }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        resolve();
      });
    });
  }

}
