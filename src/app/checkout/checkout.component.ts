import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId : any;

  constructor(private _cart: CartService) {

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {}

  submitCheckout() {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.currentStep = 3;
        this.orderId = Math.floor(Math.random() * 1000000);
        this.products = this.cartData.products;
        this._cart.clearCart();
    }, 1500);
  }

  getProgressPrecent() {
    return (this.currentStep / 3) * 100;
  }

  submitBilling(): void {
    this.nextStep();
  }

  canBillingSubmit(): boolean {
    return this.billingAddress.filter((field) => field.value.length > 0)
      .length !== 7
      ? true
      : false;
  }

  submitPayment(): void {
    this.nextStep();
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }

  billingAddress = [
    {
      name: 'Full name',
      placeholder: 'Enter your full name',
      type: 'text',
      value: '',
    },
    {
      name: 'Email',
      placeholder: 'Enter your email address',
      type: 'email',
      value: '',
    },
    {
      name: 'Address',
      placeholder: 'Enter your address',
      type: 'text',
      value: '',
    },
    {
      name: 'City',
      placeholder: 'Enter your city',
      type: 'text',
      value: '',
    },
    {
      name: 'Country',
      placeholder: 'Enter your country',
      type: 'text',
      value: '',
    },
    {
      name: 'ZIP',
      placeholder: 'Enter your zip code',
      type: 'text',
      value: '',
    },
    {
      name: 'Telephone',
      placeholder: 'Enter your telephone number',
      type: 'text',
      value: '',
    },
  ];
}