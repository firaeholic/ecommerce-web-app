import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  product: Product | any;


  showcaseImages: string[] = [];
  quantity: number = 1;

  productId: number = 0;


  constructor(
    private _cart: CartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
    });

    this.getProduct();

    

  }


  getProduct(){
    this.productService.getSingleProduct(this.productId).subscribe({
      next: response => {
        const { product } = response;
        this.product = product;
        console.log(this.product)
      }, error: error => {
        console.log(error)
      }
    })
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.product.id,
      name: this.product.name,
      imagesPath: this.product.imagesPath,
      category: this.product.category,
      price: this.product.price,
      maxAmount: this.product.maxAmount,
      amountLeft: this.product.amountLeft,
      originalAmount: this.product.originalAmount,
      unit: this.product.unit,
      productRequestID: this.product.productRequestID,
      productRequest: this.product.productRequest,
      created: this.product.created,
      lastModified: this.product.lastModified,
      quantity: this.quantity
    });
  }

}
