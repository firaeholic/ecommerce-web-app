import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { AddProduct, Product, Products, UpdateProductModel } from '../../shared/models/product';
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
    formData.append('originalAmount', product.originalAmount.toString());
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

  getProductsPagination(PageSize: number): Observable<Products> {
    const url = `${'api/productservice/product/paginated'}?PageSize=${PageSize}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.apiConfigService.getProductsPaginationConfig(url, { headers });
  }

  getSpecificProductsPagination(PageSize: number, Category: string): Observable<Products> {
    const url = `${'api/productservice/product/paginated'}?PageSize=${PageSize}&Filters.category=${Category}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.apiConfigService.getProductsPaginationConfig(url, { headers });
  }

  getFilteredProductsPagination(PageSize: number | null, Category: string, price: number | null, orderBy: string | null, isAscending: string | null): Observable<Products> {
    const url = `${'api/productservice/product/paginated'}?PageSize=${PageSize}&Filters.category=${Category}&Price=${price}&OrderBy=${orderBy}&IsAscending=${isAscending}`;
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token') || '';
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.apiConfigService.getProductsPaginationConfig(url, { headers });
  }

  updateProduct(productInfo: UpdateProductModel): Observable<UpdateProductModel> {
    const formData = new FormData();
    formData.append('id', productInfo.id.toString());
    if (productInfo.producerName) formData.append('producerName', productInfo.producerName);
    if (productInfo.producerPhone) formData.append('producerPhone', productInfo.producerPhone);
    if (productInfo.images)     
      Object.keys(productInfo).forEach(key => {
        if (key === 'images') {
          for (let i = 0; i < productInfo.images!.length; i++) {
            formData.append('Images', productInfo.images![i]);
          }
        }
    })
    if (productInfo.name) formData.append('name', productInfo.name);
    if (productInfo.description) formData.append('description', productInfo.description);
    if (productInfo.category) formData.append('category', productInfo.category);
    if (productInfo.price) formData.append('price', productInfo.price.toString());
    if (productInfo.originalAmount) formData.append('maxAmount', productInfo.originalAmount.toString());
    if (productInfo.amountLeft) formData.append('amountLeft', productInfo.amountLeft.toString());


    return this.apiConfigService.updateProductConfig('api/productservice/product', formData);
  }

}
