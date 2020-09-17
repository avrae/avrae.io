import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {isLoggedIn, removeToken} from '../SecurityHelper';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'avr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private dashboardService: DashboardService) {
    if (!isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    removeToken();
    this.router.navigate(['']);
  }
}
