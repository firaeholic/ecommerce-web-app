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

  showForgotPassword: boolean = false;

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

          if (user.isVerified) {
            await this.openConfirmDialog('Login Successful', 'Redirecting to home page...');
            window.location.href = '/home';
          } else {
            await this.openConfirmDialog('Login Successful', 'Email not verified. Redirecting to verification page...');
            window.location.href = '/verify-email';
          }
        },
        error: error => {
          console.error('Error:', error);
          if (error.error.type == "NotFoundException") {
            this.openErrorDialog("Error!", "User not found");
          }else{
            this.openErrorDialog("Error!", error.error.title);
          }
        }
      });
    } else{
      this.openErrorDialog('Error!', 'Please fill in all fields');
    }
  }

  async requestPasswordReset(email: string){
    await this.openConfirmDialog('Password reset email sent!', '');
    window.location.href = '/reset';
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
  }

  extractErrorMessage(errorTitle: string): string {
    const match = errorTitle.match(/: (.*?)(?= Severity:)/);
    return match ? match[1].trim() : '';
  }
  

  openErrorDialog(title: string, message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title, message },
      width: '300px'
    });
  }

  openConfirmDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title, message },
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(() => {
        resolve();
      });
    });
  }
  toggleShow(): void {
    const inputElement = document.getElementById("password") as HTMLInputElement | null;
    if (inputElement) {
      if (inputElement.type === "password") {
        inputElement.type = "text";
      } else {
        inputElement.type = "password";
      }
    }
  }

}
