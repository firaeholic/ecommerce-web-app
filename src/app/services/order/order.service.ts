import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { CreateOrder, Order, Orders } from '../../shared/models/order';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getSingleOrder(prodId: number): Observable<Order> {
    const url = `${'api/orderservice/order'}?ID=${prodId}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);


    return this.apiConfigService.getSingleOrderConfig(url, { headers });
  }

  getOrdersPagination(): Observable<Orders> {
    const url = `api/orderservice/order/paginated`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.apiConfigService.getOrdersPaginationConfig(url, { headers });
  }

  createOrder(data: object): Observable<CreateOrder> {
    const url = `api/orderservice/order`;

    return this.apiConfigService.createOrderConfig(url, data);
  }
}
