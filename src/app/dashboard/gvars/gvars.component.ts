import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalVar} from '../../schemas/Customization';
import {GvarService} from './gvar.service';

@Component({
  selector: 'avr-gvars',
  templateUrl: './gvars.component.html',
  styleUrls: ['./gvars.component.css']
})
export class GvarsComponent implements OnInit {

  gvars: Observable<{ owned: GlobalVar[]; editable: GlobalVar[] }>;
  forcedTabIndex: number;

  constructor(private gvarService: GvarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCustomizations();
    this.checkForLookupQuery();
  }

  getCustomizations(): void {
    this.gvars = this.gvarService.getAllGvars();
  }

  checkForLookupQuery(): void {
    const lookupId = this.route.snapshot.queryParamMap.get('lookup');
    if (lookupId) {
      this.forcedTabIndex = 2;
    }
  }
}
