import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isBoolean} from 'util';
import {GlobalVar} from '../../../schemas/Customization';
import {GvarService} from '../gvar.service';

@Component({
  selector: 'avr-gvar-lookup',
  templateUrl: './gvar-lookup.component.html',
  styleUrls: ['./gvar-lookup.component.css']
})
export class GvarLookupComponent implements OnInit {

  activeGvar: GlobalVar;
  error: string;

  constructor(private gvarService: GvarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkForLookupQuery();
  }

  lookupGvar(key: string) {
    key = key.trim();
    console.log(key);

    // set query param for permalinking
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('lookup', key);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);

    // HTTP GET /customizations/gvars/:key
    this.gvarService.getGvar(key)
      .subscribe(gvar => {
        this.activeGvar = null;
        this.error = null;
        if (isBoolean(gvar) && !gvar) {
          this.error = 'Failed to get gvar.';
        } else {
          this.activeGvar = gvar as GlobalVar;
        }
      });
  }

  checkForLookupQuery() {
    const lookupId = this.route.snapshot.queryParamMap.get('lookup');
    if (lookupId) {
      this.lookupGvar(lookupId);
    }
  }
}
