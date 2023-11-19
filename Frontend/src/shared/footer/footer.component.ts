import { Component } from '@angular/core';
import { faFacebookF,faTwitter,faGoogle,faInstagram,faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faFacebookF = faFacebookF;
  faTwitter=faTwitter;
  faGoogle=faGoogle;
  faInstagram=faInstagram;
  faLinkedinIn=faLinkedinIn;
  faHeart=faHeart;

}
