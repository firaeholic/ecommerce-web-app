import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

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
    },
    {
      name: 'Accessories',
    },
    {
      name: 'Cameras',
    },
  ];

  products = [
    {
      id: 1,
      imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
      pricePerItem: 50,
      name: 'Sun Chips',
      productType: 'Food',
      status: 'IN STOCK'
    },
    {
      id: 2,
      imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
      pricePerItem: 2500,
      name: 'Internet Cable',
      productType: 'PC Equipment',
      status: 'IN STOCK'
    },
    {
      id: 3,
      imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
      pricePerItem: 200,
      name: 'Apples',
      productType: 'Food',
      status: 'IN STOCK'
    }
  ];
  
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  activeButtonIndex: number = -1;

  constructor(
    private router: Router
  ) {}

  addToCart(product: any): void {
    this.router.navigate(['/product', product.id]);
  }

  ngOnInit(): void {


    

    // this.loading = true;
    // setTimeout(() => {
    //   this.productService.getAllProducts(9, this.productPageCounter).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       this.products = res;
    //       this.loading = false;
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.loading = false;
    //     }
    //   );
    // }, 500);
  }

  isActive(index: number): boolean {
    return this.activeButtonIndex === index;
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }

  // showMoreProducts(): void {
  //   this.additionalLoading = true;
  //   this.productPageCounter = this.productPageCounter + 1;
  //   setTimeout(() => {
  //     this.productService.getAllProducts(9, this.productPageCounter).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.products = [...this.products, ...res];
  //         this.additionalLoading = false;
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.additionalLoading = false;
  //       }
  //     );
  //   }, 500);
  // }
}
