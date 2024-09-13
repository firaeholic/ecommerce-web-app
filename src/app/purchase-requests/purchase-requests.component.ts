import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-requests',
  templateUrl: './purchase-requests.component.html',
  styleUrl: './purchase-requests.component.scss'
})
export class PurchaseRequestsComponent {
  requests = [
    {
      userName: 'Birehanu',
      productName: 'Wireless Headphones',
      amount: 2,
      image: 'https://via.placeholder.com/150'
    },
    {
      userName: 'Frank',
      productName: 'Smartphone',
      amount: 1,
      image: 'https://via.placeholder.com/150'
    }
  ];

  approveRequest(request: any) {
    console.log('Approved:', request);
  }

  rejectRequest(request: any) {
    console.log('Rejected:', request);
  }
}
