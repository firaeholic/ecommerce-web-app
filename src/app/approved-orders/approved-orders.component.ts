import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
import { Order, Orders, UpdateOrder } from '../shared/models/order';
import { Product, UpdateProductModel } from '../shared/models/product';
import UserModel, { CurrentUserModel } from '../shared/models/user';
import { AuthService } from '../services/auth/auth.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { response } from 'express';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-approved-orders',
  templateUrl: './approved-orders.component.html',
  styleUrl: './approved-orders.component.scss'
})
export class ApprovedOrdersComponent {
  orders: Order[] = [];
  user: UserModel | any;
  userHere: CurrentUserModel | null = null;
  length: number = 0;

  product: UpdateProductModel = {
    id: 0,
    amountLeft: null
  };

  updateOrder: UpdateOrder = {
    id: 0,
    orderStatus: ''
  }
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private notification: NzNotificationService
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
        this.length = this.orders.filter(order => order.orderStatus === 'Approved').length;
        console.log(this.orders);
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
      const imagePaths: string[] = []; 

      order.orderItems.forEach(orderItem => {
        this.productService.getSingleProduct(orderItem.productID).subscribe((product: Product) => {
          productNames.push(product.product.name);
          orderItem.productName = product.product.name; 
          order['productNames'] = productNames.join(' && ');
          if (product.product.imagesPath && product.product.imagesPath.length > 0) {
            imagePaths.push(...product.product.imagesPath);
          }
          if (imagePaths.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            order['orderImagePath'] = imagePaths[randomIndex];
          }
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

  async delivered(order: Order): Promise<void> {

    this.updateOrder.orderStatus = 'Delivered';
    this.updateOrder.id = order.id;
    this.orderService.approveRejectOrder(this.updateOrder).subscribe({
      next: async response => {
        await this.openConfirmDialog('Order delivered', 'Saving changes...');
        window.location.reload();
      },
      error: error => {
        this.openErrorDialog('Error', 'Cannot confirm delivery. Please try again later.');
      }
    })
    // for (const orderItem of order.orderItems) {
    //   try {
    //     this.product.id = orderItem.productID;
    //     const response = await this.productService.getSingleProduct(orderItem.productID).toPromise();

    //     if (response && response.product) {
    //       const { product } = response;
    //       this.product.amountLeft = product.amountLeft - orderItem.quantity;
    //       console.log(this.product);
    //       await this.productService.updateProduct(this.product).toPromise();
    //       await this.openConfirmDialog('Order delivery confirmed', 'Removing order from list...');
    //     } else {
    //       throw new Error('Product not found');
    //     }
    //   } catch (error) {
    //       await this.openErrorDialog('Error', 'Cannot confirm delivery. Please try again later.');
    //       break; 
    //   }
    // }
  }


  async canceled(order: Order): Promise<void> {
    this.updateOrder.orderStatus = 'Cancelled';
    this.updateOrder.id = order.id;
    console.log(this.updateOrder);
    this.orderService.approveRejectOrder(this.updateOrder).subscribe({
      next: async response => {
        await this.openConfirmDialog('Order cancelled', 'Saving changes...');
        window.location.reload();
        console.log(this.updateOrder)
      },
      error: error => {
        this.openErrorDialog('Error', 'Cannot cancel delivery. Please try again later.');
      }
    })

  }

  getTotalQuantity(order: Order): string {
    return order.orderItems.map(item => `(${item.quantity} ${item.productName})`).join('');
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
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(() => {
        resolve();
      });
    });
  }
}