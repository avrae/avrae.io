import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {GlobalVar} from "../../schemas/Customization";
import {Observable} from "rxjs";

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
