import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { AddProduct, Product, Products } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  addProduct(product: AddProduct){
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price.toString());
    formData.append('amountLeft', product.amountLeft.toString());
    formData.append('description', product.description);

    Object.keys(product).forEach(key => {
      if (key === 'images') {
        for (let i = 0; i < product.images.length; i++) {
          formData.append('Images', product.images[i]);
        }
      }
  })

    return this.apiConfigService.addProductConfig('api/productservice/product', formData);
  }

  

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
