import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product, Products } from '../shared/models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    
  }
  productsPerPage: number = 3;
  selectedPrice: number | null = null;
  selectedCategory: string = 'Fruits';
  selectedOrderBy: string | null = null;
  isAscending: string | null = '';
  AllProduct: Product[] = [];


  categoryOptions: { label: string, value: string }[] = [
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




  loadFilteredProducts(): void {
    this.productService.getFilteredProductsPagination(this.productsPerPage, this.selectedCategory, this.selectedPrice, this.selectedOrderBy, this.isAscending).subscribe({
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
