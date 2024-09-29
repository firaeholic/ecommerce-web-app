import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import UserModel from '../../shared/models/user';
import { RegisterUserModel } from '../../shared/models/user';
import { ApiConfigService } from '../api-config/api-config.service';
import loginData from '../../shared/models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private apiConfigService: ApiConfigService) {
    if (typeof window !== 'undefined') {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        this.currentUserSubject.next(JSON.parse(currentUserString));
      }
    }
  }


  registerUser(userName: string, role: string, email: string, password: string, businessLicenseFile: File): Observable<RegisterUserModel> {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('businessLicenseFile', businessLicenseFile);

    return this.apiConfigService.registerUserConfig('api/userservice/user', formData);
  }

  logUser(email: string, password: string): Observable<loginData>{
    const data = { 'email': email, 'password': password };
    return this.apiConfigService.logUserConfig('api/userservice/user/login', data)
  }

  getUser(): Observable<UserModel> {
    return this.apiConfigService.getUserByIdConfig('api/userservice/user');
  }

  getUserById(userId: number): Observable<UserModel> {
    const url = `${'api/userservice/user'}?ID=${userId}`;
    return this.apiConfigService.getUserByIdConfig(url);
  }

  getUsers(paginationId: number): Observable<UserModel[]> {
    const url = `${'api/userservice/user/paginated'}?ID=${paginationId}`;
    return this.apiConfigService.getUsersConfig(url);
  }
}