import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Product, Products } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getSingleProduct(prodId: number): Observable<Product> {
    const url = `${'api/productservice/product'}?ID=${prodId}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);


    return this.apiConfigService.getSingleProductConfig(url, { headers });
  }

  getProductsPagination(): Observable<Products> {
    const url = `api/productservice/product/paginated`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.apiConfigService.getProductsPaginationConfig(url, { headers });
  }
}
