import {Component, OnInit} from '@angular/core';
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

  constructor(private gvarService: GvarService) {
  }

  ngOnInit() {
  }

  lookupGvar(key: string) {
    key = key.trim();
    console.log(key);

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

}
