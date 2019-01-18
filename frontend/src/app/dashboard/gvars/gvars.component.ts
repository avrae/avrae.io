import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GlobalVar} from '../../schemas/Customization';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'avr-gvars',
  templateUrl: './gvars.component.html',
  styleUrls: ['./gvars.component.css']
})
export class GvarsComponent implements OnInit {

  gvars: Observable<{ owned: GlobalVar[]; editable: GlobalVar[] }>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getCustomizations();
  }

  getCustomizations(): void {
    this.gvars = this.dashboardService.getGvars();
  }

}
