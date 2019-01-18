import {Component, OnInit} from '@angular/core';
import {CharVar, Customizations} from '../../schemas/Customization';
import {DashboardService} from '../dashboard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'avr-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit {

  cvars: CharVar[];
  customizations: Observable<Customizations>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getCustomizations();
  }

  getCustomizations(): void {
    this.customizations = this.dashboardService.getCustomizations();
  }

}
