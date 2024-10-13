import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { Product, Products } from '../shared/models/product';
import { Order, Orders } from '../shared/models/order';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  initialPageSize = 6;
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

  product: Product | any;

  AllProduct: Product[] = [];

  Orders: Order[] = [];

  
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  isLoggedIn: boolean = false;

  counter: number = 0;

  activeButtonIndex: number = 0;

  userId: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private notification: NzNotificationService
  ) {}

  addToCart(product: any): void {
    if(this.isLoggedIn){
      this.router.navigate(['/product', product.id]);
    }else{
      this.notification.warning('User not logged in', `Login to add product to cart`);

    }
  }

  updateProduct(product: any): void {
    this.router.navigate(['/update-product', product.id]);
  }

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        this.userId = user.id;
      }
    }
    this.isLoggedIn = this.checkIfLoggedIn();


    this.loadProducts();

  }
  loadProducts(): void {
    this.productService.getProductsPagination(this.initialPageSize).subscribe({
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

  loadSpecificProducts(category: string): void {
    this.productService.getSpecificProductsPagination(this.initialPageSize, category).subscribe({
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

  showMoreProducts(): void{
    this.initialPageSize += 6;
    this.counter += 1;
    console.log(this.counter);
    if (this.activeButtonIndex === 0) {
      this.loadProducts();
    } else {
      const categories = ['Fruits', 'Vegetables', 'DairyProducts', 'OtherProducts'];
      this.loadSpecificProducts(categories[this.activeButtonIndex - 1]);
    }
  }

  showLessProducts(): void{
    this.initialPageSize -= 6;
    this.counter -= 1;
    if (this.activeButtonIndex === 0) {
      this.loadProducts();
    } else {
      const categories = ['Fruits', 'Vegetables', 'DairyProducts', 'OtherProducts'];
      this.loadSpecificProducts(categories[this.activeButtonIndex - 1]);
    }
  }

  isActive(index: number): boolean {
    return this.activeButtonIndex === index;
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
    if (index === 0) {
      this.loadProducts();
    } else {
      const categories = ['Fruits', 'Vegetables', 'DairyProducts', 'OtherProducts'];
      this.loadSpecificProducts(categories[index - 1]);
    }
  }

  checkIfLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') !== null;
  }


}
