import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserModel, { RegisterUserModel } from '../../shared/models/user';
import loginData from '../../shared/models/login-data';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://192.168.35.93:5076';
  TEMP_API_BASE_URL = 'http://localhost:5157';

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUserConfig(url: string, data: FormData){
    return  this.httpClient.post<RegisterUserModel>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }
  logUserConfig(url: string, data: object){
    return  this.httpClient.post<loginData>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }

  getUserByIdConfig(url: string){
    return this.httpClient.get<UserModel>(`${this.TEMP_API_BASE_URL}/${url}`);
  }

  getUsersConfig(url: string){
    return this.httpClient.get<UserModel[]>(`${this.TEMP_API_BASE_URL}/${url}`);
  }

}
