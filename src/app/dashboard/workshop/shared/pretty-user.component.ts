import {Component, Input, OnInit} from '@angular/core';
import {DiscordUser} from '../../../schemas/Discord';
import {DiscordService} from '../../../shared/discord.service';

@Component({
  selector: 'avr-pretty-user',
  template: `
    <div class="user-grid" *ngIf="user">
      <div class="user-img">
        <img [src]="user.avatarUrl" alt="Avatar of {{user.username}}">
      </div>
      <div class="user-username">
        <strong>{{getUsername()}}</strong>
      </div>

      <!-- extra buttons -->
      <div class="buttons">
        <ng-content></ng-content>
      </div>

      <div class="user-discriminator" *ngIf="getDiscriminator() != '#0'">
        {{getDiscriminator()}}
      </div>
    </div>
  `,
  styleUrls: ['./pretty-user.component.scss']
})
export class PrettyUserComponent implements OnInit {

  // one of these two must be filled, user takes priority over userId
  @Input() userId: string;    // the user ID of the user to display
  @Input() user: DiscordUser; // the user object of the user to display

  constructor(private discordService: DiscordService) {
  }

  ngOnInit(): void {
    if (!this.user && this.userId) {
      this.loadUser();
    }
  }

  // data loaders
  loadUser() {
    this.discordService.getUser(this.userId)
      .subscribe(response => {
        this.user = response;
      });
  }

  // helpers
  getUsername() {
    return this.user.username.substring(0, this.user.username.lastIndexOf('#'));
  }

  getDiscriminator() {
    return this.user.username.substring(this.user.username.lastIndexOf('#'));
  }
}
