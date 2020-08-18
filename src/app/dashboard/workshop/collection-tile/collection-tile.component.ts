import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as numeral from 'numeral';
import {DiscordUser, PartialGuild} from '../../../schemas/Discord';
import {WorkshopCollection, WorkshopTag} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collection-tile',
  templateUrl: './collection-tile.component.html',
  styleUrls: ['./collection-tile.component.scss']
})
export class CollectionTileComponent implements OnInit {

  @Input() collection: WorkshopCollection;
  @Input() showEdit: boolean = false;
  author: DiscordUser;
  tags: WorkshopTag[];

  constructor(private discord: DiscordService, private workshopService: WorkshopService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.author = {id: this.collection.owner, username: 'Loading...', avatarUrl: '../../../../assets/img/AvraeSquare.jpg'};
    this.loadAuthor();
    this.loadTags();
    this.workshopService.loadPersonalSubscribedIds();
  }

  // event handlers
  onSubscribe() {
    this.workshopService.personalSubscribe(this.collection._id)
      .subscribe(resp => {
        resp.success ? this.snackBar.open(`Subscribed to ${this.collection.name}!`) : this.snackBar.open(resp.error);
      });
  }

  onUnsubscribe() {
    this.workshopService.personalUnsubscribe(this.collection._id)
      .subscribe(resp => {
        resp.success ? this.snackBar.open(`Unsubscribed from ${this.collection.name}!`) : this.snackBar.open(resp.error);
      });
  }

  onGuildSubscribe(guild: PartialGuild) {
    this.workshopService.guildSubscribe(this.collection._id, guild.id)
      .subscribe(resp => {
        if (!resp.success) {
          this.snackBar.open(resp.error, null, {duration: 5000});
        } else if (resp.data.new_subscription) {
          this.snackBar.open(`Subscribed to ${this.collection.name} on ${guild.name}!`);
        } else {
          this.snackBar.open(`${guild.name} is already subscribed to ${this.collection.name}. You can manage
          server subscriptions in My Subscriptions!`, null, {duration: 5000});
        }
      });
  }

  // helpers
  getInitials(name: string): string {
    const match = name.match(/\b\w/g) || [];
    return (match.join('')).toUpperCase();
  }

  getNumberString(number: number): string {
    return numeral(number).format('0.[0]a');
  }

  tagNameFromSlug(slug: string): string {
    if (this.tags.map(tag => tag.slug).includes(slug)) {
      return this.tags.find(tag => tag.slug === slug).name;
    } else {
      return slug;
    }
  }

  isSubscribed() {
    return this.workshopService.personalSubscribedIds?.includes(this.collection._id);
  }

  // data loaders
  loadAuthor() {
    this.discord.getUser(this.collection.owner)
      .subscribe(user => this.author = user);
  }

  loadTags() {
    this.workshopService.getTags()
      .subscribe(result => {
        if (result.success) {
          this.tags = result.data;
        }
      });
  }

  getGuilds() {
    return this.discord.getUserGuilds();
  }
}
