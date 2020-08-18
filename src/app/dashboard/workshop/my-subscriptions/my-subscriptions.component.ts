import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {getGuildAvatarUrl, PartialGuild} from '../../../schemas/Discord';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {WorkshopService} from '../workshop.service';

const sentinel = new PartialGuild();  // sentinel with no data whatsoever

@Component({
  selector: 'avr-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['../common.scss', './my-subscriptions.component.scss']
})
export class MySubscriptionsComponent implements OnInit {
  sentinel = sentinel;  // export to component

  // state
  loading = true;
  collections: WorkshopCollection[] = [];
  error: string;
  order = 'edittime';
  guildContext: PartialGuild = sentinel;  // guild or sentinel for personal
  guildSubscribedIds: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private workshopService: WorkshopService, private discordService: DiscordService) {
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  // event handlers
  onOrderChange() {
    this.sortCollections();
  }

  onGuildContextChange() {
    this.loadCollections();
    if (this.guildContext !== sentinel) {
      this.workshopService.getGuildPermissionCheck(this.guildContext.id)
        .subscribe(response => {
          if (response.success && !response.data.can_edit) {
            this.error = `You do not have permission to edit server collections on ${this.guildContext.name}.
          You can view the subscribed collections here, but you will be unable to remove them.`;
          }
        });
    }
  }

  onGuildRemove(collection: WorkshopCollection) {
    this.workshopService.guildUnsubscribe(collection._id, this.guildContext.id)
      .subscribe(response => {
        if (response.success) {
          this.guildSubscribedIds.splice(this.guildSubscribedIds.indexOf(collection._id), 1);
          this.snackBar.open(`Removed ${collection.name} from ${this.guildContext.name}.`);
        } else {
          this.snackBar.open(response.error, null, {duration: 5000})
        }
      });
  }

  // data loaders
  loadCollections() {
    this.error = null;
    this.loading = true;
    this.collections = [];

    if (this.guildContext === sentinel) {
      this.workshopService.getMySubscriptions()
        .subscribe(response => {
          if (response.success) {
            this.loadCollectionsFromIds(response.data);
            this.guildSubscribedIds = [];
          } else {
            this.error = response.error;
          }
        });
    } else {
      this.workshopService.getGuildSubscriptions(this.guildContext.id)
        .subscribe(response => {
          if (response.success) {
            this.loadCollectionsFromIds(response.data);
            this.guildSubscribedIds = response.data;
          } else {
            this.error = response.error;
          }
        });
    }
  }

  loadCollectionsFromIds(ids: string[]) {
    if (ids.length === 0) {
      this.loading = false;
    }

    ids.forEach(id => {
      this.workshopService.getCollection(id)
        .subscribe(response => {
          if (response.success) {
            this.collections.push(response.data);
            // ensure the collections populate in the requested order
            this.sortCollections();
            if (this.collections.length >= ids.length) {
              this.loading = false;
            }
          } else {
            this.error = response.error;
          }
        });
    });
  }

  getUserGuilds(): Observable<PartialGuild[]> {
    return this.discordService.getUserGuilds();
  }

  // helpers
  sortCollections() {
    let sorter;
    switch (this.order) {
      case 'alphabetical':
        sorter = (a, b) => a.name.localeCompare(b.name);
        break;
      case 'newest':
        sorter = (a, b) => b.created_at.localeCompare(a.created_at); // iso8601 lets us str compare :)
        break;
      default:
        sorter = (a, b) => b.last_edited.localeCompare(a.last_edited);
    }
    this.collections.sort(sorter);
  }

  getGuildAvatarUrl(guild: PartialGuild) {
    return getGuildAvatarUrl(guild, 32);
  }
}
