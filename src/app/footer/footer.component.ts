import { Component } from '@angular/core';
import { faTelegram, faInstagram, faTiktok, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  email = '';

  faTelegram = faTelegram;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faFacebook = faFacebook;
  faYoutube = faYoutube;

  constructor(
    private notification: NzNotificationService
  ) { }

  subscribe(): void {
    if (!this.email) {
      this.notification.create('error', 'Error', 'Please enter your email address!');
      return;
    }
    this.notification.create('success', 'Subscribed!', 'You have successfully subscribed to our newsletter!');
  }
}
