import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Attack, CharacterMeta} from '../../../schemas/Character';
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
              private dialogRef: MatDialogRef<AttackEditorDialog>) {
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
}
