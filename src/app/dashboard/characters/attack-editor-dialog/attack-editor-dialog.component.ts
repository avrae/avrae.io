import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Attack, CharacterMeta} from '../../../schemas/Character';
import {Spell} from '../../../schemas/homebrew/Spells';
import {JSONExportDialog} from '../../../shared/dialogs/json-export-dialog/json-export-dialog.component';
import {JSONImportDialog} from '../../../shared/dialogs/json-import-dialog/json-import-dialog.component';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'avr-attack-editor-dialog',
  templateUrl: './attack-editor-dialog.component.html',
  styleUrls: ['./attack-editor-dialog.component.css']
})
export class AttackEditorDialog implements OnInit {

  selectedAttack: Attack;
  allAttacks: Attack[];

  saveButtonValue = 'Save and Exit';
  saveButtonDisabled = false;
  errorValue: string;

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

  deleteAttack(attack: Attack) {
    const index = this.allAttacks.indexOf(attack);
    if (index > -1) {
      this.allAttacks.splice(index, 1);
    }
    this.selectedAttack = null;
  }

  saveAndExit() {
    this.saveButtonValue = `Saving...`;
    this.saveButtonDisabled = true;

    this.charService.putCharacterAttacks(this.character.upstream, this.allAttacks)
      .subscribe(result => {
        this.saveButtonValue = 'Save and Exit';
        this.saveButtonDisabled = false;

        if (result) {
          // successful PUT, exit
          this.dialogRef.close();
        } else {
          // failed PUT, display error... somewhere
          this.errorValue = 'Failed to save attacks.';
        }
      });
  }

  // JSON
  beginJSONExport(attack: Attack | Attack[]) {
    this.dialog.open(JSONExportDialog, {
      data: {name: (attack instanceof Array) ? 'All Attacks' : attack.name, data: attack},
      width: '60%'
    });
  }

  beginJSONImport() {
    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      disableClose: true,
      data: {validator: (data) => this.validateAttackJSON(dialogRef, data)}
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
          console.log(result);
          dialogRef.componentInstance.loading = false;
          if (result.success) {
            dialogRef.close(JSON.parse(dialogRef.componentInstance.data));
          } else {
            dialogRef.componentInstance.error = result.result;
          }
        }
      );
  }
}
