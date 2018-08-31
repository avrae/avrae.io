import {Component} from '@angular/core';
import {isLoggedIn, removeToken} from "../SecurityHelper";
import {Router} from "@angular/router";

@Component({
  selector: 'avr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {
    if (!isLoggedIn()) {
      this.router.navigate(["login"]);
    }
  }

  logout() {
    removeToken();
    this.router.navigate(['']);
  }

}
