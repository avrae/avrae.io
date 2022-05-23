import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CollectableType, WorkshopAliasFull, WorkshopCollectable, WorkshopCollection} from '../../../../schemas/Workshop';
import {GamedataService} from '../../../../shared/gamedata.service';
import {CollectableDisplayComponent} from '../../collectable-display/collectable-display.component';
import {WorkshopService} from '../../workshop.service';
import {CollectableEditDialogComponent} from '../collectable-edit-dialog/collectable-edit-dialog.component';
import {CreateCollectableDialogComponent} from '../create-collectable-dialog/create-collectable-dialog.component';

@Component({
  selector: 'avr-collectable-edit',
  templateUrl: './collectable-edit.component.html',
  styleUrls: ['./collectable-edit.component.scss', '../../collectable-display/collectable-display.component.scss']
})
export class CollectableEditComponent extends CollectableDisplayComponent implements OnInit {

  @Input() collection: WorkshopCollection;

  constructor(public workshopService: WorkshopService, public gamedataService: GamedataService,
              private dialog: MatDialog) {
    super(workshopService, gamedataService);
  }

  ngOnInit(): void {
  }

  // event handlers
  onEdit() {
    const dialogRef: MatDialogRef<CollectableEditDialogComponent, WorkshopCollectable> = this.dialog.open(
      CollectableEditDialogComponent,
      {
        disableClose: true,
        minWidth: '70%',
        panelClass: 'collectable-overlay',
        data: {collection: this.collection, alias: this.alias, snippet: this.snippet, parent: this.parentComponent?.alias}
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.alias) {
          Object.assign(this.alias, result);  // so that the reference from the collection page holds
        } else {
          Object.assign(this.snippet, result);
        }
      }
    });
  }

  onCreateSubalias() {
    const dialogRef: MatDialogRef<CreateCollectableDialogComponent, WorkshopAliasFull> = this.dialog.open(
      CreateCollectableDialogComponent,
      {
        disableClose: true,
        data: {collection: this.collection, collectableType: CollectableType.SUBALIAS, parent: this.alias}
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alias.subcommands.push(result);
      }
    });
  }

  canOpen() {
    return super.canOpen()
      || (this.alias && !this.alias.subcommands.length);
  }
}
