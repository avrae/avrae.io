import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {getGuildAvatarUrl, PartialGuild} from '../../../schemas/Discord';
import {DiscordService} from '../../../shared/discord.service';

const sentinel = new PartialGuild();

@Component({
  selector: 'avr-guild-select-field',
  template: `
    <mat-form-field appearance="fill" class="toolbar-search-form-guild-context">
      <mat-label>{{label}}</mat-label>
      <mat-select [(value)]="guildContext" (selectionChange)="onGuildContextChange()">
        <mat-option [value]="sentinel">{{defaultLabel}}</mat-option>
        <mat-option *ngFor="let guild of getUserGuilds() | async" [value]="guild">
          <img *ngIf="getGuildAvatarUrl(guild)" [src]="getGuildAvatarUrl(guild)" alt="Guild icon" class="guild-icon">
          {{guild.name}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
      `
      .guild-icon {
        border-radius: 100%;
        width: 24px;
        height: 24px;
        margin-bottom: -6px;
        margin-right: 4px;
      }
    `
  ]
})
export class GuildSelectFieldComponent implements OnInit {
  sentinel = sentinel;

  @Input() label = 'Server';
  @Input() defaultLabel = 'Me';
  @Output() guildChange = new EventEmitter<PartialGuild | null>();

  guildContext: PartialGuild = sentinel;


  constructor(private discordService: DiscordService) {
  }

  ngOnInit(): void {
  }

  // event listeners
  onGuildContextChange() {
    this.guildChange.emit(this.guildContext === sentinel ? null : this.guildContext);
  }

  // data loaders
  getUserGuilds(): Observable<PartialGuild[]> {
    return this.discordService.getUserGuilds();
  }

  // helpers
  getGuildAvatarUrl(guild: PartialGuild) {
    return getGuildAvatarUrl(guild, 32);
  }

}
