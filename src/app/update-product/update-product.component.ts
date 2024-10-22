import { Component, OnInit } from '@angular/core';
import { AddProduct, Product, ProductCategory, UpdateProductModel } from '../shared/models/product';
import { ProductService } from '../services/product/product.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{

  product: UpdateProductModel = {
    id: 0,
    producerName: null,
    producerPhoneNumber: null,
    name: null,
    images: null,
    category: null,
    price: null,
    amountLeft: null,
    description: null,
    originalAmount: null,
  };

  oldProduct: Product | any;


  prodId: number = 0;


  categories = Object.values(ProductCategory)
  
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.prodId = Number(params.get('id'));
      this.product.id = this.prodId;
    });

    this.getProduct();
  }

  getProduct(){
    this.productService.getSingleProduct(this.prodId).subscribe({
      next: response => {
        const { product } = response;
        this.oldProduct = product;
        this.product.name = this.oldProduct.name;
        this.product.category = this.oldProduct.category;
        this.product.price = this.oldProduct.price;
        this.product.amountLeft = this.oldProduct.amountLeft;
        this.product.description = this.oldProduct.description;
        this.product.originalAmount = this.oldProduct.originalAmount;
        this.product.producerName = this.oldProduct.producerName;
        this.product.producerPhoneNumber = this.oldProduct.producerPhoneNumber;
      }, error: error => {
        console.log(error)
      }
    })
  }

  async updateProduct(){
    this.productService.updateProduct(this.product).subscribe({
      next: async response => {
        console.log(response);
        await this.openConfirmDialog('Success!', 'Product updated successfully')
        window.location.href = '/home';
      },
      error: error => {
        console.error('Error:', error);
        this.openErrorDialog('Error!', "An error occurred while updating product");
      }
    })
      
  }
  clearFields(imagesInput: any, bedroomInput: any, descriptionInput : any, nameInput : any, price: any) 
  {
    imagesInput.value = '';
    bedroomInput.value = '';
    descriptionInput.value = '';
    nameInput.value = '';
    price.value = '';
  }

  onFileChange(event: any): void {
    this.product.images = event.target.files;
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
