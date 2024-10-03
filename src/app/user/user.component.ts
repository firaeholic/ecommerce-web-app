import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import UserModel, { CurrentUserModel} from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  currentUser: UserModel | null = null;

  userHere: CurrentUserModel | null = null;


  joined: string = '';


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


      
    
  

  async logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('access_token');
    }
    await this.openConfirmDialog('Logout Successful', 'Logging you out...');
    window.location.href = '/home';
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
