import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
import { Order, Orders, UpdateOrder } from '../shared/models/order';
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

  orders: Order[] = [];
  user: UserModel | any;
  userHere: CurrentUserModel | null = null;

  orderLength: number = 0;

  updateOrder: UpdateOrder = {
    id: 0,
    orderStatus: ''
  }
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
        this.orderLength = this.orders.filter(order => order.orderStatus === 'Pending').length;
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
            console.log(order['orderImagePath']);
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

  async approveOrder(order: Order): Promise<void> {
    this.updateOrder.orderStatus = 'Approved';
    this.updateOrder.id = order.id;
    console.log(this.updateOrder);
    this.orderService.approveRejectOrder(this.updateOrder).subscribe({
    })
    await this.openConfirmDialog('Order approved', 'Saving changes...');
    window.location.reload();
  }

  async rejectOrder(order: Order): Promise<void> {
    this.updateOrder.orderStatus = 'Cancelled';
    this.updateOrder.id = order.id;
    console.log(this.updateOrder);
    this.orderService.approveRejectOrder(this.updateOrder).subscribe({
    })
    await this.openConfirmDialog('Order rejected', 'Saving changes...');
    window.location.reload();
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

  goToApproved(){
    this.router.navigate(['/approved']);
  }
}
