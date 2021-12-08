import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {isLoggedIn, removeToken} from '../SecurityHelper';
import {BreakpointBaseComponent} from '../shared/breakpoints';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'avr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BreakpointBaseComponent {

  constructor(private router: Router, private dashboardService: DashboardService, private bp: BreakpointObserver) {
    super(bp);
    if (!isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    removeToken();
    this.router.navigate(['']);
  }
}
