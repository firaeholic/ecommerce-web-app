import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import UserModel, { UpdateUserModel, Users, VerifyUserModel } from '../../shared/models/user';
import { RegisterUserModel } from '../../shared/models/user';
import { ApiConfigService } from '../api-config/api-config.service';
import loginData from '../../shared/models/login-data';
import { HttpHeaders } from '@angular/common/http';

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


  registerUser(name: string, userName: string, role: string, email: string, password: string, businessLicenseFile: File): Observable<RegisterUserModel> {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('businessLicenseFile', businessLicenseFile);
    formData.append('name', name)

    return this.apiConfigService.registerUserConfig('api/userservice/user', formData);
  }

  logUser(email: string, password: string): Observable<loginData>{
    const data = { 'email': email, 'password': password };
    return this.apiConfigService.logUserConfig('api/userservice/user/login', data)
  }

  getUserById(userId: number): Observable<UserModel> {
    const url = `${'api/userservice/user'}?ID=${userId}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.apiConfigService.getUserByIdConfig(url, { headers });
  }

  getUsers(paginationId: number): Observable<Users> {
    const url = `${'api/userservice/user/paginated'}?ID=${paginationId}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.apiConfigService.getUsersConfig(url, { headers });
  }

  updateUser(userInfo: UpdateUserModel): Observable<UpdateUserModel> {
    const formData = new FormData();
    formData.append('id', userInfo.id.toString());
    if (userInfo.name) formData.append('name', userInfo.name);
    if (userInfo.userName) formData.append('userName', userInfo.userName);
    if (userInfo.email) formData.append('email', userInfo.email);
    if (userInfo.password) formData.append('password', userInfo.password);
    if (userInfo.role) formData.append('role', userInfo.role);
    if (userInfo.phoneNumber) formData.append('phoneNumber', userInfo.phoneNumber);
    if (userInfo.businessLicenseFile) formData.append('businessLicenseFile', userInfo.businessLicenseFile);

    return this.apiConfigService.updateUserConfig('api/userservice/user/update', formData);
  }

  verifyUser(userInfo: VerifyUserModel): Observable<VerifyUserModel> {
    const formData = new FormData();
    formData.append('id', userInfo.id.toString());
    formData.append('role', userInfo.role);
    formData.append('isVerified', userInfo.isVerified.toString());
    formData.append('isLicenseApproved', userInfo.isLicenseApproved.toString());
    formData.append('phoneNumberVerified', userInfo.phoneNumberVerified.toString());
    
    return this.apiConfigService.verifyUserConfig('api/userservice/user/update', formData);
  }
}
