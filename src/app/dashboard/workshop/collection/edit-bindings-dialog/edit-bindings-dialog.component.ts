import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {cloneDeep} from 'lodash';
import {Observable} from 'rxjs';
import {PartialGuild} from '../../../../schemas/Discord';
import {WorkshopBindings, WorkshopCollectable, WorkshopCollectionFull} from '../../../../schemas/Workshop';
import {ApiResponse} from '../../../APIHelper';
import {WorkshopService} from '../../workshop.service';

interface EditBindingsDialogData {
  collection: WorkshopCollectionFull;
  guildContext: PartialGuild;
  bindings: WorkshopBindings;
}

@Component({
  selector: 'avr-edit-bindings-dialog',
  templateUrl: './edit-bindings-dialog.component.html',
  styleUrls: ['./edit-bindings-dialog.component.scss']
})
export class EditBindingsDialogComponent implements OnInit {

  // inputs
  collection: WorkshopCollectionFull;
  guildContext: PartialGuild;
  bindings: WorkshopBindings;

  // state
  loading = false;
  error: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditBindingsDialogData,
              private workshopService: WorkshopService, private dialogRef: MatDialogRef<EditBindingsDialogComponent>) {
    this.collection = data.collection;
    this.guildContext = data.guildContext;
    // we make a deep copy of the original bindings
    // so that we can edit them without editing the collection page
    // then post them if the user saves
    this.bindings = cloneDeep(data.bindings);
  }

  ngOnInit(): void {
  }

  // event handlers
  onSave() {
    this.loading = true;
    let request: Observable<ApiResponse<WorkshopBindings>>;
    if (this.guildContext) {
      request = this.workshopService.guildSubscribe(this.collection._id, this.guildContext.id, this.bindings);
    } else {
      request = this.workshopService.personalSubscribe(this.collection._id, this.bindings);
    }
    request.subscribe(response => {
      this.loading = false;
      if (response.success) {
        this.dialogRef.close(this.bindings);
      } else {
        this.error = response.error;
      }
    });
  }

  // helpers
  findBinding(isAlias: boolean, collectable: WorkshopCollectable): { name: string, id: string } {
    const bindings = isAlias ? this.bindings.alias_bindings : this.bindings.snippet_bindings;
    return bindings.find(binding => binding.id === collectable._id);
  }
}
