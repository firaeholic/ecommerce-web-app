import { Component, OnInit } from '@angular/core';
import { CurrentUserModel } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit{

  currentUser: CurrentUserModel | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private notification: NzNotificationService
  ){}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      console.log(this.currentUser);
      }
  }

  async verifyEmail(otp: string){

    const email = this.currentUser?.email;
  
    if (email) {
      this.auth.verifyEmail(otp, email).subscribe({
        next: async () => {
          await this.openConfirmDialog('Email verified!', 'Redirecting to home page...');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.openErrorDialog("Error!", "Unknown error occurred");
        }
      });
    } else {
      this.openErrorDialog("Error!", "Unknown error occurred");
    }

  }
  resent(){
    this.notification.create('success', 'Sent!', 'OTP has been sent to your email');
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

}
