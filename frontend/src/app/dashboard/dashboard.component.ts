import {Component} from '@angular/core';
import {isLoggedIn, removeToken} from "../SecurityHelper";
import {Router} from "@angular/router";
import {getUser, removeUser, setUser} from "./APIHelper";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'avr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private dashboardService: DashboardService) {
    if (!isLoggedIn()) {
      this.router.navigate(["login"]);
    }
    if (!getUser()) {
      this.getUserInfo();
    }
  }

  logout() {
    removeToken();
    removeUser();
    this.router.navigate(['']);
  }

  getUserInfo(): void {
    this.dashboardService.getUserInfo()
      .subscribe(userInfo => setUser(userInfo));
  }

}
