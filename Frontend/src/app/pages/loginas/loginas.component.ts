import { WindowRef } from '@agm/core/lib/utils/browser-globals';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loginas',
  templateUrl: './loginas.component.html',
  styleUrls: ['./loginas.component.scss']
})
export class LoginasComponent {
  email: string='';
  subscribed: boolean=false;

  onSubmit() {
    alert('Thank you for your message! We will get back to you with our latest updates.');
    this.email = '';
    this.subscribed = false;
    window.location.href = '#';
  }
}