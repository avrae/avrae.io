import {Component, OnInit} from '@angular/core';
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

  constructor(private gvarService: GvarService) {
  }

  ngOnInit() {
    this.getCustomizations();
  }

  getCustomizations(): void {
    this.gvars = this.gvarService.getAllGvars();
  }
}
