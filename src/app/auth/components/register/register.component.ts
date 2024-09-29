import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user_name: string = '';
  role: string = '';
  email: string = '';
  password: string = '';
  business_license_file: File | null = null;

  passwordVisible = false;

  isScrolled: boolean = false;
  isMenuOpen: boolean = false;

  constructor (
    private router : Router,
    private auth: AuthService,
    private dialog: MatDialog
  ){}

  async registerUser() {

    if (this.user_name && this.role && this.email && this.password) {

      if (this.business_license_file) {
        this.auth.registerUser(this.user_name, this.role, this.email, this.password, this.business_license_file).subscribe({
          next: async () => {
            await this.openConfirmDialog('Registration Successful', 'User registered successfully! Redirecting to login page...');
            this.router.navigate(['/login']);
            
          },
          error: (error) => {
            const errorMessage = this.extractErrorMessage(error.error.title);
            this.openErrorDialog("An error occurred", errorMessage);

          }
        });
      } else {
        alert("Business License File is required!");
      }
    } else {
      alert("All fields are required!");
    }
  }

  extractErrorMessage(errorTitle: string): string {
    const match = errorTitle.match(/: (.*?)(?= Severity:)/);
    return match ? match[1].trim() : '';
  }
  
  // extractErrorTitle(errorTitle: string): string {
  //   const match = errorTitle.match(/-- (.*?):/);
  //   return match ? match[1].trim() : 'An error occurred';
  // }
  

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
  
  
  updateFileName(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fileName = input.files?.length ? input.files[0].name : 'No file chosen';
    const fileNameElement = document.getElementById('file-name');
    if (fileNameElement) {
      fileNameElement.textContent = fileName;
    }
    this.business_license_file = input.files ? input.files[0] : null;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
