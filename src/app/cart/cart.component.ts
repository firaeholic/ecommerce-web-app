import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CurrentUserModel } from '../shared/models/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  {
  cartData: any;
  currentUser: CurrentUserModel | null = null;


  constructor(
    private _cart: CartService,
    private notification: NzNotificationService
  ) {
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log(cartData);
    });
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      console.log(this.currentUser);
      }
  }

  checkout(): void {
    if (this.currentUser?.isVerified) {
      window.location.href = '/checkout';
    } else {
      this.notification.create('error', 'Error', 'Verify your email address to proceed to checkout!');

    }
  }

  updateCart(id: number, quantity: number): void {
    console.log({ id, quantity });
    this._cart.updateCart(id, quantity);
  }

  removeCartItem(id: number): void {
    this._cart.removeProduct(id);
  }

  
}
