import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  product: Product | any;


  

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

  }

  clearFields(imagesInput: any, bedroomInput: any, descriptionInput : any, nameInput : any, price: any) 
  {
    imagesInput.value = '';
    bedroomInput.value = '';
    descriptionInput.value = '';
    nameInput.value = '';
    price.value = '';
  }

  onFileChange(event: any): void {
    this.product.product.imagesPath = event.target.files;
  }
  }

