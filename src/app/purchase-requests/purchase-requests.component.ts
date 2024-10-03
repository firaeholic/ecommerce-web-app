import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
import { Order, Orders } from '../shared/models/order';
import { Product } from '../shared/models/product';
import UserModel, { CurrentUserModel } from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-requests',
  templateUrl: './purchase-requests.component.html',
  styleUrl: './purchase-requests.component.scss'
})
export class PurchaseRequestsComponent implements OnInit {
  
  requests = [
    {
      userName: 'Birehanu',
      productName: 'Wireless Headphones',
      amount: 2,
      image: 'https://via.placeholder.com/150'
    },
    {
      userName: 'Frank',
      productName: 'Smartphone',
      amount: 1,
      image: 'https://via.placeholder.com/150'
    }
  ];

  orders: Order[] = [];
  user: UserModel | any;
  userHere: CurrentUserModel | null = null;



  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {

      this.userHere = JSON.parse(localStorage.getItem('currentUser') || '{}');

      if (this.userHere?.role !== "Admin") {
        window.location.href = '/home';
      } else {
        this.loadOrders();
      }
    

    }
  }
  loadOrders(): void {
    this.orderService.getOrdersPagination().subscribe({
      next: (response: Orders) => {
        const { orders } = response;
        this.orders = orders;
        this.populateProductNames();
        this.getOrderUserInfo();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  populateProductNames(): void {
    this.orders.forEach(order => {
      const productNames: string[] = [];
      order.orderItems.forEach(orderItem => {
        this.productService.getSingleProduct(orderItem.productID).subscribe((product: Product) => {
          productNames.push(product.product.name);
          orderItem.productName = product.product.name; 
          order['productNames'] = productNames.join(' && ');
        });
      });
    });
  }

  getOrderUserInfo(): void {
    this.orders.forEach(order => {
      this.auth.getUserById(order.userID).subscribe((user: UserModel) => {
        order.user = user;
      });
    });
  }

  seeUserInfo(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  getTotalQuantity(order: Order): string {
    return order.orderItems.map(item => `(${item.quantity} ${item.productName})`).join('');
  }

  approveRequest(request: any) {
    console.log('Approved:', request);
  }

  rejectRequest(request: any) {
    console.log('Rejected:', request);
  }

  openErrorDialog(title: string, message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title, message },
      width: '300px'
    });
  }
}
