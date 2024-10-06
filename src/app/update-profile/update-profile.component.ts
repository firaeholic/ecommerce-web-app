import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserModel, UpdateUserModel } from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit{
  userModel: UpdateUserModel = {
    id: 0,
    name: '',
    userName: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    businessLicenseFile: undefined
  };

  roles = ['Wholesaler', 'Retailer']; 
  allRoles = ['Admin','Wholesaler', 'Retailer']; 



  userId: number | undefined;

  isUserAdmin: boolean = false;

  currentUser: CurrentUserModel | null = null;



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.userModel.id = this.userId;
    });

    this.isUserAdmin = this.checkIfUserAdmin();
  
  }

  async updateProfile(): Promise<void> {
    if (this.isFormValid()) {
      try {
        await this.authService.updateUser(this.userModel).toPromise();
        localStorage.removeItem('currentUser');
        const updatedUser = await this.authService.getUserById(this.userModel.id).toPromise();
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        await this.openConfirmDialog('Update Successful', 'Redirecting to profile page...');
        window.location.href = '/profile/' + this.userId;
      } catch (error) {
        this.openErrorDialog('Error!', "An error has occurred");
      }
    } else {
      this.openErrorDialog('Error!', 'Please fill in all fields');
    }
  }

  checkIfUserAdmin(): boolean {
    if(this.currentUser?.role === 'Admin') {
      return true;
    } else {
      return false
  }
}

  isFormValid(): boolean {
    return !!(
      this.userModel.name &&
      this.userModel.userName &&
      this.userModel.email &&
      this.userModel.password &&
      this.userModel.role &&
      this.userModel.phoneNumber &&
      this.userModel.businessLicenseFile
    );
  }


  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.userModel.businessLicenseFile = event.target.files[0];
    }
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
