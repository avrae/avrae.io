import {Component, OnInit} from '@angular/core';
import {Item} from '../../../../schemas/homebrew/Items';
import {HomebrewService} from '../../homebrew.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'avr-pack-srd-import-dialog',
  templateUrl: './pack-srd-import-dialog.component.html',
  styleUrls: ['./pack-srd-import-dialog.component.css']
})
export class PackSRDImportDialog implements OnInit {

  search: string = '';
  templateItems: Item[];
  filteredTemplateItems: Item[];

  constructor(private hbService: HomebrewService, private dialogRef: MatDialogRef<PackSRDImportDialog>) {
  }

  ngOnInit() {
    this.getTemplateItems();
  }

  select(item: Item) {
    this.dialogRef.close(item);
  }

  filterItems() {
    console.log(this.search);
    this.filteredTemplateItems = this.templateItems.filter(
      item => item.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  getTemplateItems() {
    this.hbService.getTemplateItems()
      .subscribe(items => {
        this.templateItems = items;
        this.filterItems();
      });
  }

}
