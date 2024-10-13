import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { CurrentUserModel } from '../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  currentUser: CurrentUserModel | null = null;

  joined: string = '';

  userId: number | undefined;


  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(this.currentUser);
    }

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });

    if(this.currentUser){
      const dateJoined = new Date(this.currentUser.created);
      const year = dateJoined.getFullYear();
      const monthNumber = dateJoined.getMonth() + 1;
  
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = months[monthNumber - 1];
  
      this.joined = `Joined on ${monthName} ${year}`;
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

  openEditProfile(){
    this.router.navigate([`/edit-profile/${this.userId}`]);
    console.log("clicked");
  }

}
