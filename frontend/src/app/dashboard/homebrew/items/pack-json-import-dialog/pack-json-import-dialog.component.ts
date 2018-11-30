import {Component, OnInit} from '@angular/core';
import {Item, REQUIRED_ITEM_PROPS} from "../../../../schemas/homebrew/Items";

@Component({
  selector: 'avr-pack-import-dialog',
  templateUrl: './pack-json-import-dialog.component.html',
  styleUrls: ['./pack-json-import-dialog.component.css']
})
export class PackJSONImportDialog implements OnInit {

  data: string;
  valid: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getOutput(): Item[] | Item {
    return JSON.parse(this.data);
  }

  validate() {
    let parsed;
    try {
      parsed = JSON.parse(this.data);
    } catch (e) {
      this.valid = false;
      return;
    }
    if (parsed instanceof Array) {
      if (parsed.length < 1) {
        this.valid = false;
      } else {
        this.valid = parsed.every(item => this.objectIsItem(item));
      }
    } else if (parsed) {
      this.valid = this.objectIsItem(parsed);
    } else {
      this.valid = false;
    }
  }

  objectIsItem(obj: any): obj is Item {
    return REQUIRED_ITEM_PROPS.every(v => v in obj);
  }

}
