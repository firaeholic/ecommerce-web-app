import UserModel from "./user";
import { Product } from "./product";

export class Order {
    order!: {
      userID: number;
      user: UserModel | null;
      orderStatus: OrderStatus;
      orderItems: OrderItem[];
      deliveryDate: string;
      deliveryAddress: string;
      totalPrice: number;
      id: number;
      created: string;
      lastModified: string;
    }
  
    userID!: number;
    user!: UserModel | null;
    orderStatus!: OrderStatus;
    orderItems!: OrderItem[];
    deliveryDate!: string;
    deliveryAddress!: string;
    totalPrice!: number;
    id!: number;
    created!: string;
    lastModified!: string;
    productNames?: string;
    orderImagePath?: string;
  }
  
  export class Orders {
    orders!: Order[];
  }
  export class OrderItem {
    product!: Product;
    productID!: number;
    order!: Order;
    orderID!: number;
    quantity!: number;
    id!: number;
    created!: string;
    lastModified!: string;
    productName?: string;
  }
  
  export enum OrderStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected'
  }

  export class CreateOrder{
    userId!: number;
    orderStatus!: string;
    orderItems!: OrderItem[];
    deliveryDate!: string;
    deliveryAddress!: string;
    totalPrice!: number;

    data?:{
      message: string;
      id: number;
      result: any;
      status: number;
      resultType: string;
    }
  }

  export class UpdateOrder{
    id!: number;
    orderStatus!: string
  }