import { Component, OnInit } from '@angular/core';
import UserModel, { Users } from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{

  users: UserModel[] = [];


  constructor(
    private userService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(0).subscribe({
      next: (response: Users) => {
        const { users } = response;
        this.users = users;
        console.log(this.users);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  seeUserInfo(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

}
