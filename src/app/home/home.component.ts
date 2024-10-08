import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { response } from 'express';
import { ProductService } from '../services/product/product.service';
import { Product, Products } from '../shared/models/product';
import { Order, Orders } from '../shared/models/order';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // products: Product[] = [];
  categories: any[] = [
    {
      name: 'Laptops',
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
    },
    {
      name: 'Watches',
      imageUrl: "https://media.gq-magazine.co.uk/photos/6660cf60aa9580e0fa0b0b91/16:9/w_1280,c_limit/Best-watch-brands-hp.jpeg"

    },
    {
      name: 'Vegetables',
      imageUrl: "https://www.bhg.com/thmb/Mwd_YEkDbVg_fPsUDcWr3eZk9W0=/5645x0/filters:no_upscale():strip_icc()/difference-between-fruits-vegetables-01-5f92e7ec706b463287bcfb46985698f9.jpg"

    },
  ];

  // products = [
  //   {
  //     id: 1,
  //     imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
  //     pricePerItem: 50,
  //     name: 'Sun Chips',
  //     productType: 'Food',
  //     status: 'IN STOCK'
  //   },
  //   {
  //     id: 2,
  //     imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
  //     pricePerItem: 2500,
  //     name: 'Internet Cable',
  //     productType: 'PC Equipment',
  //     status: 'IN STOCK'
  //   },
  //   {
  //     id: 3,
  //     imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
  //     pricePerItem: 200,
  //     name: 'Apples',
  //     productType: 'Food',
  //     status: 'IN STOCK'
  //   }
  // ];

  product: Product | any;





  AllProduct: Product[] = [];

  Orders: Order[] = [];

  
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  activeButtonIndex: number = -1;

  userId: number = 0;

  constructor(
    private router: Router,
    private auth: AuthService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  addToCart(product: any): void {
    this.router.navigate(['/product', product.id]);
  }

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        this.userId = user.id;
      }
    }

    this.loadProducts();


    // this.getUserById();

    // this.getUsers();

  }
  loadProducts(): void {
    this.productService.getProductsPagination().subscribe({
      next: (response: Products) => {
        const { products } = response;
        this.AllProduct = products.map(product => {
          product.imagesPath = product.imagesPath.map((path: string) => 
            path.replace(/\\/g, '/').replace(/ /g, '%20')

          );
          console.log(product.imagesPath)
          return product;
        });
        console.log(this.AllProduct);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }


  // getUserById(): void {
  //   this.auth.getUserById(this.userId).subscribe({
  //     next: response => {
  //       const { user } = response;
  //       console.log(user);
  //     }
  //   }
  //   )
  // }

  // getUsers(): void {
  //   this.auth.getUsers(0).subscribe({
  //     next: response => {
  //       console.log(response);
  //     }
  //   })
  // }

  isActive(index: number): boolean {
    return this.activeButtonIndex === index;
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }


}
