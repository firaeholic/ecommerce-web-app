import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { provideRouter, Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  passwordVisible = false;

  isScrolled: boolean = false;
  isMenuOpen: boolean = false;

  constructor (
    private router : Router,
  ){}

  // registerUser(first_name: string, last_name: string, email: string, password: string){
  //   if(first_name && last_name && email && password){

  //     this.userService.registerUser(first_name, last_name, email, password).subscribe({
  //       next: () => {
  //         this.userService.logUser(email, password).subscribe({
  //           next: user => {
  //             alert('User registered successfully!');
  //             localStorage.setItem('currentUser', JSON.stringify(user));
  //             this.router.navigate(['/verify-email']);
  //           },
  //           error: error => {
  //             alert(error.errors);
  //           }
  //         });
  //       },
  //       error: (error) => {
  //         alert(error.error.errors);
  //       }
  //     })
  //   }else{
  //     alert("Fill all fields!");
  //   }
  // }
  
  

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
