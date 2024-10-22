import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product, Products } from '../shared/models/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    
  }
  productsPerPage: number = 3;
  selectedMinPrice: number | null = null;
  selectedMaxPrice: number | null = null;
  selectedCategory: string | null = null;
  selectedOrderBy: string | null = null;
  isAscending: string | null = '';
  AllProduct: Product[] = [];


  categoryOptions: { label: string, value: string | null }[] = [
    { label: 'All', value: null},
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Dairy Products', value: 'DairyProducts' },
    { label: 'Cereals', value: 'Cereals' },
    { label: 'Other Products', value: 'OtherProducts' }
  ];


  orderByOptions: { label: string, value: string | null }[] = [
    { label: 'None', value: null },
    { label: 'Price', value: 'Price' },
    { label: 'Amount Left', value: 'AmountLeft' },
    { label: 'Date added', value: 'created' },
    { label: 'Name', value: 'name' }
  ];

  ascendingOptions: { label: string, value: string }[] = [
    { label: 'None', value: '' },
    { label: 'Ascending', value: 'true' },
    { label: 'Descending', value: 'false' }
  ];

  buildUrl(): string {
    let url = 'api/productservice/product/paginated?';
    if (this.productsPerPage !== null) {
      url += `PageSize=${this.productsPerPage}&`;
    }
    if (this.selectedCategory !== null) {
      url += `Filters.category=${this.selectedCategory}&`;
    }
    if (this.selectedMinPrice !== null && this.selectedMaxPrice !== null) {
      url += `Filters.%26Price=>%3D%3A%40%23${this.selectedMinPrice}%3A%40%23<%3D%3A%40%23${this.selectedMaxPrice}`;
    }
    if (this.selectedMinPrice !== null && this.selectedMaxPrice == null) {
      url += `Filters.Price=%3E%3D%3A%40%23${this.selectedMinPrice}`;
    }
    if (this.selectedMinPrice == null && this.selectedMaxPrice !== null) {
      url += `Filters.Price=%3C%3D%3A%40%23${this.selectedMaxPrice}`;
    }
    if (this.selectedOrderBy !== null) {
      url += `OrderBy=${this.selectedOrderBy}&`;
    }
    if (this.isAscending !== '') {
      url += `IsAscending=${this.isAscending}&`;
    }
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
    return url;
  }


  loadFilteredProducts(): void {
    const url = this.buildUrl();
    console.log(url);
    this.productService.getFilteredProductsPagination(url).subscribe({
      next: (response: Products) => {
        const { products } = response;
        this.AllProduct = products.map(product => {
          product.imagesPath = product.imagesPath.map((path: string) => 
            path.replace(/\\/g, '/').replace(/ /g, '%20')

          );
          console.log(product.imagesPath)
          return product;
        });
        console.log(this.AllProduct);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  showMoreProducts(): void{
    this.productsPerPage += this.productsPerPage;
    this.loadFilteredProducts();
    }
  

  isDropdownOpen: boolean = false;


}
