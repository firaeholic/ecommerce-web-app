import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import UserModel, { CurrentUserModel, VerifyUserModel} from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  userModel: VerifyUserModel = {
    id: 0,
    role: '',
    phoneNumberVerified: false,
    isLicenseApproved: false,
    isVerified: false,
  };

  currentUser: UserModel | null = null;

  userHere: CurrentUserModel | null = null;

  joined: string = '';

  baseUrl = 'http://localhost:5157/';

  licenseUrl = ''

  businessUrl = '';


  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      this.userHere = JSON.parse(localStorage.getItem('currentUser') || '{}');

      if (this.userHere?.role !== "Admin") {
        window.location.href = '/home';
      } else {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
          const numericUserId = Number(userId); 
          this.authService.getUserById(numericUserId).subscribe({
            next: (user: UserModel) => {
              this.currentUser = user;
              console.log(this.currentUser);
    
              const dateJoined = new Date(this.currentUser.created);
              const year = dateJoined.getFullYear();
              const monthNumber = dateJoined.getMonth() + 1;
    
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              const monthName = months[monthNumber - 1];
              this.joined = `${monthName} ${year}`;
            },
            error: (err) => {
              if(err.status !== 401){
                this.openErrorDialog('Error!', 'User not found').then(() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/home';
                  }
                });
              }
    
            }
          });
        } 
      }
      }
  }

  checkLicense(): void {

    if(this.currentUser){
      this.businessUrl = this.currentUser.businessLicenseFilePath;
      if(this.businessUrl === null || this.businessUrl === ''){
        this.openErrorDialog('Error!', 'No license uploaded for this user');
        return;
      }
      this.licenseUrl = this.baseUrl + this.businessUrl;
      console.log(this.licenseUrl);
      window.open(this.licenseUrl, '_blank');
    }
  }

  async verifyUser(): Promise<void> {
    if(this.currentUser){
      this.userModel.id = this.currentUser.id;
      this.userModel.role = this.currentUser.role;
      this.userModel.phoneNumberVerified = this.currentUser.phoneNumberVerified;
      this.userModel.isVerified = this.currentUser.isVerified;
      this.userModel.isLicenseApproved = true;
      console.log(this.userModel);
      this.authService.verifyUser(this.userModel).subscribe({
        next: async response => {
          await this.openConfirmDialog('Success!', 'User verified successfully');
          window.location.reload();
        },
        error: error => {
          console.log(error);
          this.openErrorDialog('Error!', 'An error occurred while verifying user');
        }
  })
}}

async unverifyUser(): Promise<void> {
  if(this.currentUser){
    this.userModel.id = this.currentUser.id;
    this.userModel.role = this.currentUser.role;
    this.userModel.phoneNumberVerified = this.currentUser.phoneNumberVerified;
    this.userModel.isVerified = this.currentUser.isVerified;
    this.userModel.isLicenseApproved = false;
    console.log(this.userModel);
    this.authService.verifyUser(this.userModel).subscribe({
      next: async response => {
        await this.openConfirmDialog('Success!', 'User unverified successfully');
        window.location.reload();
      },
      error: error => {
        console.log(error);
        this.openErrorDialog('Error!', 'An error occurred while unverifying user');
      }
})
}}

async adminize(): Promise<void> {
  const confirmPromotion = confirm(
    'Are you sure you want to promote this user to admin? This action cannot be reverted from the website.'
  )
  if(confirmPromotion){
    if(this.currentUser){
      this.userModel.id = this.currentUser.id;
      this.userModel.role = 'Admin';
      this.userModel.phoneNumberVerified = this.currentUser.phoneNumberVerified;
      this.userModel.isVerified = this.currentUser.isVerified;
      this.userModel.isLicenseApproved = this.currentUser.isLicenseApproved;
      console.log(this.userModel);
      this.authService.verifyUser(this.userModel).subscribe({
        next: async response => {
          await this.openConfirmDialog('Success!', 'User promoted successfully');
          window.location.reload();
        },
        error: error => {
          console.log(error);
          this.openErrorDialog('Error!', 'An error occurred while promoting user');
        }
  })
  }}
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
  openErrorDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { title, message },
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(() => {
        resolve();
      });
    });

  }
}
