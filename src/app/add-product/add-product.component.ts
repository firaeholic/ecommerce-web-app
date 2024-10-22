import { Component, OnInit } from '@angular/core';
import { AddProduct, Product, ProductCategory } from '../shared/models/product';
import { ProductService } from '../services/product/product.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{


  product: AddProduct = {
    name: '',
    images: [],
    category: '',
    price: 0,
    amountLeft: 0,
    description: '',
    originalAmount: 0,
    producerName: '',
    producerPhoneNumber: '',
    unit: ''
  };

  categories = Object.values(ProductCategory)
  

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  async addProduct(){
    this.product.originalAmount = this.product.amountLeft;
    if (this.isFormValid()) {
      this.productService.addProduct(this.product).subscribe({
        next: async response => {
          console.log(response)
          await this.openConfirmDialog('Success!', 'Product added successfully')
          window.location.href = '/home';
        },
        error: error => {
          console.error('Error:', error.error.errors);
          this.openErrorDialog('Error!', "An error occurred while adding the product");
        }
      })
    } else {
      this.openErrorDialog('Error!', 'Please fill in all fields');
    }
  }

  isFormValid(): boolean {
    return !!(
      this.product.name &&
      this.product.description &&
      this.product.amountLeft &&
      this.product.price &&
      this.product.images &&
      this.product.amountLeft
    )
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

