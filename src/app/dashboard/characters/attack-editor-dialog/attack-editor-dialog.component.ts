import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Attack, CharacterMeta} from '../../../schemas/Character';
import {JSONExportDialog} from '../../../shared/dialogs/json-export-dialog/json-export-dialog.component';
import {JSONImportDialog} from '../../../shared/dialogs/json-import-dialog/json-import-dialog.component';
import {SRDCopyDialog} from '../../../shared/dialogs/srd-copy-dialog/srd-copy-dialog.component';
import {ApiResponse} from '../../APIHelper';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'avr-attack-editor-dialog',
  templateUrl: './attack-editor-dialog.component.html',
  styleUrls: ['./attack-editor-dialog.component.scss']
})
export class AttackEditorDialog implements OnInit {

  selectedAttack: Attack;
  allAttacks: Attack[];

  saveButtonValue = 'Save';
  saveAndExitButtonValue = 'Save and Exit';
  saveButtonDisabled = false;
  errorValue: string;
  showAdvancedOptions = false;

  constructor(@Inject(MAT_DIALOG_DATA) public character: CharacterMeta, private charService: DashboardService,
              private dialogRef: MatDialogRef<AttackEditorDialog>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadAttacks();
  }

  loadAttacks() {
    this.charService.getCharacterAttacks(this.character.upstream)
      .subscribe(result => {
        this.allAttacks = result;
      });
  }

  addAndSelectNewAttack() {
    const atk = new Attack();
    this.allAttacks.push(atk);
    this.selectedAttack = atk;
  }

  newFromSRD() {
    const dialogRef = this.dialog.open(SRDCopyDialog, {
      width: '60%',
      disableClose: true,
      data: {getter: () => this.charService.getTemplateAttacks(), namer: a => a.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allAttacks.push(result);
        this.selectedAttack = result;
      }
    });
  }

  deleteAttack(attack: Attack) {
    const index = this.allAttacks.indexOf(attack);
    if (index > -1) {
      this.allAttacks.splice(index, 1);
    }
    this.selectedAttack = null;
  }

  doSave(): Observable<ApiResponse<string>> {
    this.saveButtonValue = `Saving...`;
    this.saveAndExitButtonValue = `Saving...`;
    this.saveButtonDisabled = true;

    return this.charService.putCharacterAttacks(this.character.upstream, this.allAttacks)
      .pipe(map(result => {
        this.saveButtonValue = 'Save';
        this.saveAndExitButtonValue = 'Save and Exit';
        this.saveButtonDisabled = false;

        if (!result || result.error) {
          // failed PUT, display error... somewhere
          this.errorValue = result?.error || 'Failed to save attacks.';
        } else {
          this.errorValue = null;
        }
        return result;
      }));
  }

  save() {
    this.doSave().subscribe();
  }

  saveAndExit() {
    this.doSave()
      .subscribe(result => {
        if (result && !result.error) {
          // successful PUT, exit
          this.dialogRef.close();
        }
      });
  }

  // JSON
  beginJSONExport(attack: Attack | Attack[]) {
    this.dialog.open(JSONExportDialog, {
      data: {name: (attack instanceof Array) ? 'All Attacks' : attack.name, data: attack, yaml: true},
      width: '60%'
    });
  }

  beginJSONImport() {
    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      disableClose: true,
      data: {validator: (data) => this.validateAttackJSON(dialogRef, data), yaml: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const attack: Attack | Attack[] = result;
        if (attack instanceof Array) {
          this.allAttacks.push(...attack);
        } else {
          this.allAttacks.push(attack);
        }
      }
    });
  }

  validateAttackJSON(dialogRef: MatDialogRef<JSONImportDialog>, data) {
    this.charService.validateAttackJSON(data)
      .subscribe(
        result => {
          dialogRef.componentInstance.loading = false;
          if (result.success) {
            dialogRef.close(data);
          } else {
            dialogRef.componentInstance.error = result.error;
          }
        }
      );
  }
}
