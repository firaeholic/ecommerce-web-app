import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserModel, { RegisterUserModel, UpdateUserModel } from '../../shared/models/user';
import loginData from '../../shared/models/login-data';
import { AddProduct, Product, Products } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { CreateOrder, Order, Orders } from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://192.168.35.93:5076';
  TEMP_API_BASE_URL = 'http://localhost:5157';

  constructor(
    private httpClient: HttpClient
  ) { }

  // Users config
  registerUserConfig(url: string, data: FormData){
    return this.httpClient.post<RegisterUserModel>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }
  logUserConfig(url: string, data: object){
    return this.httpClient.post<loginData>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }

  getUserByIdConfig(url: string, options: { headers: HttpHeaders }){
    return this.httpClient.get<UserModel>(`${this.TEMP_API_BASE_URL}/${url}`, options);
  }

  getUsersConfig(url: string){
    return this.httpClient.get<UserModel[]>(`${this.TEMP_API_BASE_URL}/${url}`);
  }
  updateUserConfig(url: string, data: FormData){
    return this.httpClient.post<UpdateUserModel>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }

  // Products config
  getSingleProductConfig(url: string, options: { headers: HttpHeaders }): Observable<Product> {
    return this.httpClient.get<Product>(`${this.TEMP_API_BASE_URL}/${url}`, options);
  }

  getProductsPaginationConfig(url: string, options: { headers: HttpHeaders }){
    return this.httpClient.get<Products>(`${this.TEMP_API_BASE_URL}/${url}`, options);
  }

  addProductConfig(url: string, data: FormData){
    return this.httpClient.post<AddProduct>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }

  // Orders config
  getSingleOrderConfig(url: string, options: { headers: HttpHeaders }): Observable<Order>{
    return this.httpClient.get<Order>(`${this.TEMP_API_BASE_URL}/${url}`, options);
  }

  getOrdersPaginationConfig(url: string, options: { headers: HttpHeaders }){
    return this.httpClient.get<Orders>(`${this.TEMP_API_BASE_URL}/${url}`, options);
  }

  createOrderConfig(url: string, data: object){
    return this.httpClient.post<CreateOrder>(`${this.TEMP_API_BASE_URL}/${url}`, data);
  }

}
