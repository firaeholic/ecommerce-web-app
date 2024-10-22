import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CurrentUserModel } from '../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { CreateOrder } from '../shared/models/order';
import { OrderService } from '../services/order/order.service';
import { error } from 'console';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  currentUser: CurrentUserModel | null = null;
  userId: number = 0;
  deliveryDate: Date = new Date();
  deliveryAddress: string = '';
  paymentMethod: string = '';

  orderModel: CreateOrder = {
    userId: 0,
    orderStatus: 'Pending',
    deliveryDate: '',
    orderItems: [],
    deliveryAddress: '',
    totalPrice: 0,
  }

  currentStep = 1;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId : any;

  constructor(
    private _cart: CartService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) {
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
      this.orderModel.orderItems = this.cartData.products.map((product: any) => ({
        productID: product.id,
        quantity: product.quantity
      }));
      console.log(this.orderModel.orderItems);
    });
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if(this.currentUser){
        this.userId = this.currentUser?.id;
        this.orderModel.userId = this.userId;
      }

      }
  }

  submitCheckout() {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.currentStep = 3;
        this.products = this.cartData.products;
        this.orderService.createOrder(this.orderModel).subscribe({
          next: response => {
            const { data } = response; 
            this.orderId = data?.id;
            this.openConfirmDialog('Order successful', 'Order sent! Clearing cart...');
            this._cart.clearCart();
          },
          error: error => {
            this.openErrorDialog('Error!', 'An error has occurred');
          } 
        }

        );
    }, 1500);
  }

  getProgressPrecent() {
    return (this.currentStep / 3) * 100;
  }

  submitBilling(): void {

    const today = new Date();
    const deliveryDate = new Date(this.deliveryDate);
    const oneYearAhead = new Date(today);
    oneYearAhead.setFullYear(today.getFullYear() + 1);

    this.orderModel.deliveryDate = this.deliveryDate.toString();
    this.orderModel.deliveryAddress = this.deliveryAddress;
    this.orderModel.totalPrice = this.cartData.total;

    console.log(this.orderModel);

    if (deliveryDate > today && deliveryDate <= oneYearAhead) {
        this.nextStep();
    } else {
        this.openErrorDialog('Invalid Date', 'Delivery date must be between today and one year ahead.');
    }
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

  openErrorDialog(title: string, message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title, message },
      width: '400px'
    });
  }

  openConfirmDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { title, message },
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(() => {
        resolve();
      });
    });
  }
}