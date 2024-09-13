import { Component } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {


  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrls: '',
    quantity: 0
  };

  constructor() { }

  clearFields(imagesInput: any, bedroomInput: any, descriptionInput : any, nameInput : any, price: any) 
  {
    imagesInput.value = '';
    bedroomInput.value = '';
    descriptionInput.value = '';
    nameInput.value = '';
    price.value = '';
  }

  onFileChange(event: any): void {
    this.product.imageUrls = event.target.files;
  }
  }

