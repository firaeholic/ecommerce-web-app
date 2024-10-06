import { Component, Input, Output, EventEmitter } from '@angular/core';



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

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }



  loading = false;

  constructor() {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.loading = false; 
    // }, 100);
  }


  handleLike() {
  }
}
