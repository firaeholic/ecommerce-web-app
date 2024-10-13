import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrentUserModel } from '../models/user';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() id: any;
  @Input() type: any;
  @Input() imageUrl: any;
  @Input() price: any;
  @Input() title: any;
  @Input() productType: any;
  @Input() status: any;
  @Input() imageWidth: any;
  @Input() imageHeight: any;

  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();
  @Output() updateProduct = new EventEmitter<any>();




  loading = false;

  isLoggedIn: boolean = false;

  userHere: CurrentUserModel | null = null;

  userId: number | undefined;

  isUserAdmin: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isLoggedIn = this.checkIfLoggedIn();

    if (typeof localStorage !== 'undefined') {

      this.userHere = JSON.parse(localStorage.getItem('currentUser') || '{}');

      this.userId = this.userHere?.id;
    

    }

    this.isUserAdmin = this.checkIfUserAdmin();
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
  onUpdateProduct(): void {
    this.updateProduct.emit(this.product);
  }

  checkIfUserAdmin(): boolean {
    if(this.userHere?.role === 'Admin') {
      return true;
    } else {
      return false
  }
}

checkIfLoggedIn(): boolean {
  return typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') !== null;
}


  handleLike() {
  }
}
