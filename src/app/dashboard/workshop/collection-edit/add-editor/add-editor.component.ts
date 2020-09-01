import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DiscordUser} from '../../../../schemas/Discord';
import {DiscordService} from '../../../../shared/discord.service';

@Component({
  selector: 'avr-add-editor',
  template: `
    <mat-form-field>
      <mat-label>Add Editor</mat-label>
      <input matInput placeholder="zhu.exe#4211" (keyup)="onEditorSearch($event)">
      <mat-spinner matSuffix *ngIf="loading" [diameter]="16"></mat-spinner>
    </mat-form-field>
    <div *ngIf="error" class="mat-error">
      {{error}}
    </div>
    <avr-pretty-user *ngIf="validEditor" [user]="validEditor">
      <button mat-icon-button matTooltip="Add editor" (click)="onAddEditor()">
        <mat-icon class="muted">add</mat-icon>
      </button>
    </avr-pretty-user>
  `,
  styles: []
})
export class AddEditorComponent implements OnInit {

  editorSearch = new Subject<string>();
  validEditor: DiscordUser;
  loading = false;
  error: string;

  @Output() addEditor = new EventEmitter<DiscordUser>();

  constructor(private discordService: DiscordService) {
  }

  ngOnInit(): void {
    this.editorSearch
      .pipe(debounceTime(750))
      .pipe(distinctUntilChanged())
      .subscribe(username => this.onSearchUser(username));
  }

  // event handlers
  onEditorSearch(event) {
    this.editorSearch.next(event.target.value);
  }

  onSearchUser(username: string) {
    this.validEditor = null;
    this.error = null;
    if (!username.includes('#')) {  // user must have discrim at least
      return;
    }
    this.loading = true;
    this.discordService.searchUser(username)
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.validEditor = response.data;
        } else if (response.status === 404) {
          this.error = 'No matching user found. Make sure the username is correct and that they have logged in here at least once!';
        } else {
          this.error = response.error;
        }
      });
  }

  onAddEditor() {
    this.addEditor.emit(this.validEditor);
  }
}
