import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'avr-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {

  @Input()
  mobile = false;

  popup;

  constructor() { }

  ngOnInit() {
  }

  openLoginPopup() {
    let listener = (event) => console.log(event);
    this.popup = window.open(environment.loginURL, 'Popup', 'width=300, height=600');
    window.addEventListener('auth_msg', listener);
    if (this.popup !== null) {
      console.log(this.popup);
      this.popup.onclose(() => window.removeEventListener('auth_msg', listener));
      // auth
    }
  }

}
