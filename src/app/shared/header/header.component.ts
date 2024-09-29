import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavActive: boolean = false;

  isLoggedIn: boolean = false;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.isLoggedIn = this.checkIfLoggedIn();
  }

  checkIfLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') !== null;
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }

  async logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('access_token');
    }
    await this.openConfirmDialog('Logout Successful', 'Logging you out...');
    window.location.reload();
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