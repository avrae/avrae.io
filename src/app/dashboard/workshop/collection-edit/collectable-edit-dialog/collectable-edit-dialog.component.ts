import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {groupBy} from 'lodash';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {
  CodeVersion,
  DDBEntity,
  PublicationState,
  WorkshopAliasFull,
  WorkshopCollectable,
  WorkshopCollectionFull,
  WorkshopEntitlement,
  WorkshopSnippet
} from '../../../../schemas/Workshop';
import {ApiResponse} from '../../../APIHelper';
import {ConfirmDeleteDialog} from '../../../confirm-delete-dialog/confirm-delete-dialog.component';
import {WorkshopService} from '../../workshop.service';

interface CollectableEditDialogComponentData {
  collection: WorkshopCollectionFull;
  alias: WorkshopAliasFull;
  parent: WorkshopAliasFull;
  snippet: WorkshopSnippet;
}

@Component({
  selector: 'avr-collectable-edit-dialog',
  templateUrl: './collectable-edit-dialog.component.html',
  styleUrls: ['./collectable-edit-dialog.component.scss', '../../dialog-common.scss', '../../common.scss']
})
export class CollectableEditDialogComponent implements OnInit {
  PublicationState = PublicationState;
  wordWrap = 'off';
  editorOptions = {theme: 'draconicTheme', language: 'draconic', scrollBeyondLastLine: false, wordWrap: this.wordWrap};
  readonlyEditorOptions = {...this.editorOptions, readOnly: true};  

  toggleWordWrap() {
    this.wordWrap = this.wordWrap === 'on' ? 'off' : 'on'
    this.editorOptions = Object.assign({}, this.editorOptions, { wordWrap: this.wordWrap });
    this.readonlyEditorOptions = Object.assign({}, this.readonlyEditorOptions, { wordWrap: this.wordWrap });
  }

  // data
  collection: WorkshopCollectionFull; // root collection
  alias: WorkshopAliasFull;           // mutex snippet
  parent: WorkshopAliasFull;          // the parent of this alias, if applicable
  snippet: WorkshopSnippet;           // mutex alias

  // new values
  name: string;
  docs: string;
  selectedCodeVersion: CodeVersion;
  creatingNewCodeVersion: boolean;
  newCodeVersionContent: string;

  // state
  loading = false;
  error: string;
  entitlementsControl = new FormControl();
  allEntities: DDBEntity[];
  addableEntitlements: Observable<[string, DDBEntity[]][]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CollectableEditDialogComponentData,
              private dialogRef: MatDialogRef<CollectableEditDialogComponent>,
              private workshopService: WorkshopService, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.collection = data.collection;
    this.alias = data.alias;
    this.parent = data.parent;
    this.snippet = data.snippet;
    this.name = this.collectable.name;
    this.docs = this.collectable.docs;
    this.selectedCodeVersion = this.collectable.versions.length ? this.collectable.versions.find(cv => cv.is_current) : null;
  }

  ngOnInit(): void {
    this.updateAddableEntitlements();
  }

  get collectable(): WorkshopCollectable {
    return this.alias || this.snippet;
  }

  // event handlers
  onSave() {
    if (this.name !== this.collectable.name
      || this.docs !== this.collectable.docs) {
      this.error = null;
      this.loading = true;
      const request = this.alias
        ? this.workshopService.editAlias(this.alias._id, this.name, this.docs)
        : this.workshopService.editSnippet(this.snippet._id, this.name, this.docs);
      request.subscribe(response => {
        this.loading = false;
        if (response.success) {
          Object.assign(this.collectable, response.data);
        } else {
          this.error = response.error;
        }
      });
    }
  }

  onDelete() {
    // confirm delete
    const dialogRef: MatDialogRef<ConfirmDeleteDialog, boolean> = this.dialog.open(
      ConfirmDeleteDialog,
      {data: {name: this.collectable.name}}
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.error = null;
        this.loading = true;
        // do the delete
        const request = this.alias
          ? this.workshopService.deleteAlias(this.alias._id)
          : this.workshopService.deleteSnippet(this.snippet._id);
        request.subscribe(response => {
          this.loading = false;
          if (response.success) {
            // remove this from parent or collection
            if (this.parent) {
              this.parent.subcommands.splice(this.parent.subcommands.indexOf(this.alias), 1);
            } else if (this.alias) {
              this.collection.aliases.splice(this.collection.aliases.indexOf(this.alias), 1);
            } else if (this.snippet) {
              this.collection.snippets.splice(this.collection.snippets.indexOf(this.snippet), 1);
            }
            this.dialogRef.close();
          } else {
            this.error = response.error;
          }
        });
      }
    });
  }

  onDone() {
    // if no outstanding changes, just close
    if (this.name === this.collectable.name
      && this.docs === this.collectable.docs
      && !(this.creatingNewCodeVersion && this.newCodeVersionContent)) {
      this.dialogRef.close(this.collectable);
    } else {
      // otherwise pop up a confirmation snackbar (?)
      this.snackBar.open('You have unsaved changes. Do you want to discard them?', 'Discard',
        {duration: 5000}
      ).afterDismissed().subscribe(
        event => {
          if (event.dismissedByAction) {
            this.dialogRef.close(this.collectable);
          }
        }
      );
    }
  }

  onViewCodeVersion(codeVersion: CodeVersion) {
    this.selectedCodeVersion = codeVersion;
    this.creatingNewCodeVersion = false;
  }

  onStartCreatingCodeVersion() {
    if (this.creatingNewCodeVersion) {
      return;
    }
    this.selectedCodeVersion = null;
    this.creatingNewCodeVersion = true;
    this.newCodeVersionContent = this.newCodeVersionContent || '';
  }

  onSaveNewCodeVersion() {
    this.error = null;
    this.loading = true;
    let request: Observable<ApiResponse<CodeVersion>>;
    if (this.alias) {
      request = this.workshopService.createAliasCodeVersion(this.alias._id, this.newCodeVersionContent);
    } else {
      request = this.workshopService.createSnippetCodeVersion(this.snippet._id, this.newCodeVersionContent);
    }
    request.subscribe(response => {
      this.loading = false;
      if (response.success) {
        // select the new version
        this.collectable.versions.push(response.data);
        this.onViewCodeVersion(response.data);
        // clear the editor
        this.newCodeVersionContent = '';
      } else {
        this.error = response.error;
      }
    });
  }

  onSetCurrentAsActive() {
    if (!this.selectedCodeVersion) {
      console.error('tried to set null code version as active');
      return;
    }
    this.error = null;
    this.loading = true;
    let request: Observable<ApiResponse<WorkshopCollectable>>;
    if (this.alias) {
      request = this.workshopService.setActiveAliasCodeVersion(this.alias._id, this.selectedCodeVersion.version);
    } else {
      request = this.workshopService.setActiveSnippetCodeVersion(this.snippet._id, this.selectedCodeVersion.version);
    }
    request.subscribe(response => {
      this.loading = false;
      if (response.success) {
        Object.assign(this.collectable, response.data);
        // refresh the reference from selected
        this.selectedCodeVersion = this.collectable.versions.find(cv => cv.version === this.selectedCodeVersion.version);
      } else {
        this.error = response.error;
      }
    });
  }

  onRemoveEntitlement(entitlement: WorkshopEntitlement) {
    this.loading = true;
    this.error = null;
    let request: Observable<ApiResponse<WorkshopEntitlement[]>>;
    if (this.alias) {
      request = this.workshopService.removeAliasEntitlement(this.alias._id, entitlement);
    } else {
      request = this.workshopService.removeSnippetEntitlement(this.snippet._id, entitlement);
    }
    request.subscribe(response => {
      this.loading = false;
      if (response.success) {
        this.collectable.entitlements = response.data;
      } else {
        this.error = response.error;
      }
    });
  }

  onAddEntitlement(entitlement: DDBEntity) {
    this.loading = true;
    this.error = null;
    let request: Observable<ApiResponse<WorkshopEntitlement[]>>;
    if (this.alias) {
      request = this.workshopService.addAliasEntitlement(this.alias._id, entitlement);
    } else {
      request = this.workshopService.addSnippetEntitlement(this.snippet._id, entitlement);
    }
    request.subscribe(response => {
      this.loading = false;
      if (response.success) {
        this.collectable.entitlements = response.data;
      } else {
        this.error = response.error;
      }
    });
  }

  // helpers
  getSortedVersions() {
    return this.collectable.versions.sort((a, b) => b.version - a.version);
  }

  getEntity(entitlement: WorkshopEntitlement) {
    return this.workshopService.entityFromEntitlement(entitlement.entity_type, entitlement.entity_id);
  }

  updateAddableEntitlements() {
    // load entitlements
    this.workshopService.getEntitlements()
      .subscribe(response => {
        this.allEntities = Array.from(response.data.values());
        this.entitlementsControl.setValue(''); // emit a value to get started
      });

    // subscribe to changes to update autocomplete
    // debounce 500 because this is actually really expensive
    this.addableEntitlements = this.entitlementsControl.valueChanges
      .pipe(debounceTime(500))
      .pipe(map(value => {
        const possible = this.allEntities
          // filter out entities that are already in the entitlement list
          .filter(entity => !this.collectable.entitlements
            .find(entitlement => entitlement.entity_type === entity.entity_type && entitlement.entity_id === entity.entity_id))
          // filter to entities that contain the search
          .filter(entity => entity.name.toLowerCase().includes(value.toLowerCase()))
          // sort alphabetically
          .sort((a, b) => a.name.localeCompare(b.name));
        // group by entitlement type and sort
        return Object.entries(groupBy(possible, entity => entity.entity_type))
          .sort(([categoryA, _], [categoryB, __]) => categoryA.localeCompare(categoryB));
      }));
  }
}
