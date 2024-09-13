import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  product: any;
  showcaseImages: string[] = [];
  quantity: number = 1;

  constructor(
    private _cart: CartService
  ) {}


  ngOnInit(): void {

    this.product = {
      id: 1,
      quantity: 10,
      price: 7850,
      description: 'This is a very cute cat',
      name: 'Barry',
      category: 'Animal',
      status: 'IN STOCK',
      image: 'https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg',
    }
    

    this.showcaseImages = [
      'https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg',
      'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
    ];
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.product.id,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.image,
      title: this.product.name,
      maxQuantity: this.product.quantity,
    });
  }

}
