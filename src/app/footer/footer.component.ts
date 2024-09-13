import { Component } from '@angular/core';
import { faTelegram, faInstagram, faTiktok, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faTelegram = faTelegram;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
}
