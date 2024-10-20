import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { cartProduct } from '../../shared/models/product';

interface ProductParams {
  id: number;
  price: number;
  quantity: number;
  image: string;
  title: string;
  maxQuantity: number;
}

interface CartData {
  products: cartProduct[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData: CartData = {
    products: [],
    total: 0,
  };

  cartDataObs$ = new BehaviorSubject(this.cartData);

  constructor(
    private _notification: NzNotificationService,
  ) {
    if (typeof localStorage !== 'undefined') {
      let localCartData = JSON.parse(localStorage.getItem('cart') ?? 'null');
      if (localCartData) this.cartData = localCartData;
    }

    this.cartDataObs$.next(this.cartData);
  }

  addProduct(params: cartProduct): void {
    const {
      id,
      name,
      imagesPath,
      category,
      price,
      maxAmount,
      amountLeft,
      originalAmount,
      unit,
      productRequestID,
      productRequest,
      created,
      lastModified,
      quantity
    } = params;

    const product = {
      id,
      name,
      imagesPath,
      category,
      price,
      maxAmount,
      amountLeft,
      originalAmount,
      unit,
      productRequestID,
      productRequest,
      created,
      lastModified,
      quantity
    };

    if (!this.isProductInCart(id)) {
      this.cartData.products.push(product);
      this.updateCartData();
      this._notification.success('Product added', `${name} has been added to your cart.`);
    } else {
      this._notification.warning('Product already in cart', `${name} is already in your cart.`);
    }
  }

  private isProductInCart(productId: number): boolean {
    return this.cartData.products.some(product => product.id === productId);
  }

  private updateCartData(): void {
    this.cartData.total = this.cartData.products.reduce((total, product) => total + product.price * product.quantity, 0);
    this.cartDataObs$.next(this.cartData);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    }
  }

  removeProduct(id: number): void {
    let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));

    this._notification.create(
      'success',
      'Removed successfully',
      'The selected item was removed from the cart successfully'
    );
  }

  updateCart(id: number, quantity: number): void {
    // copy array, find item index and update
    let updatedProducts = [...this.cartData.products];
    let productIndex = updatedProducts.findIndex((prod) => prod.id == id);

    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantity: quantity,
    };

    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    console.log(this.cartData.products);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }
  
  clearCart(): void {
    this.cartData = {
      products: [],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod) => (totalSum += prod.price * prod.quantity)
    );

    return totalSum;
  }




}
