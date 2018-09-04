import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {GlobalVar} from "../../schemas/Customization";

@Component({
  selector: 'avr-gvars',
  templateUrl: './gvars.component.html',
  styleUrls: ['./gvars.component.css']
})
export class GvarsComponent implements OnInit {

  ownedGvars: GlobalVar[];
  editableGvars: GlobalVar[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getCustomizations();
  }

  getCustomizations(): void {
    this.dashboardService.getGvars()
      .subscribe(gvars => {
        this.ownedGvars = gvars.owned;
        this.editableGvars = gvars.editable;
      });
  }

}
