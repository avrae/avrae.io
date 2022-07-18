import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Attack, CharacterMeta} from '../../../schemas/Character';
import {JSONExportDialog} from '../../../shared/dialogs/json-export-dialog/json-export-dialog.component';
import {JSONImportDialog} from '../../../shared/dialogs/json-import-dialog/json-import-dialog.component';
import {SRDCopyDialog} from '../../../shared/dialogs/srd-copy-dialog/srd-copy-dialog.component';
import {ValidationSnackbar} from '../../../shared/validation-snackbar/validation-snackbar.component';
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
              private dialogRef: MatDialogRef<AttackEditorDialog>, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }


  ngOnDestroy() {
    this.snackBar.dismiss();
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
    const atk = new Attack('New Attack');
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
          this.snackBar.openFromComponent(ValidationSnackbar, {
            data: {
              html: `${result.error}`
            },
            horizontalPosition: 'right',
            duration: -1
          });
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

  // YAML
  beginYAMLExport(attack: Attack | Attack[]) {
    this.dialog.open(JSONExportDialog, {
      data: {name: (attack instanceof Array) ? 'All Attacks' : attack.name, data: attack, yaml: true},
      width: '60%'
    });
  }

  beginYAMLImport() {
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
            this.snackBar.openFromComponent(ValidationSnackbar, {
              data: {
                html: `${result.error}`
              },
              horizontalPosition: 'right',
              duration: -1
            });
          }
        }
      );
  }

  // attack model wrappers
  @removeEmpty('verb') verbWrapper: string;
  @removeEmpty('thumb') thumbWrapper: string;
  @removeEmpty('phrase') phraseWrapper: string;
  @removeEmpty('criton') critonWrapper: number;
  @removeEmpty('extra_crit_damage') extraCritDamageWrapper: string;
  @removeEmpty('activation_type') activationTypeWrapper: number;
}

// adapted from https://stackoverflow.com/questions/59651284/dynamic-setter-from-decorator-typescript-complains-about-read-only-property
// used to define getters/setters for wrapped props on selectedAttack that undefine them if the set value is empty
function removeEmpty(attackProp: string) {
  return function (target, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function (this) {
        return this.selectedAttack[attackProp];
      },
      set: function (this, value) {
        this.selectedAttack[attackProp] = value || undefined;
      },
    });
  };
}
