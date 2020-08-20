import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {PartialGuild} from '../../../schemas/Discord';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['../common.scss', './my-subscriptions.component.scss']
})
export class MySubscriptionsComponent implements OnInit {

  // state
  loading = true;
  collections: WorkshopCollection[] = [];
  error: string;
  order = 'edittime';
  guildContext: PartialGuild | null;
  guildSubscribedIds: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  // event handlers
  onOrderChange() {
    this.sortCollections();
  }

  onGuildContextChange(guild: PartialGuild | null) {
    this.guildContext = guild;
    this.loadCollections();
    if (this.guildContext) {
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
          this.snackBar.open(response.error, null, {duration: 5000});
        }
      });
  }

  // data loaders
  loadCollections() {
    this.error = null;
    this.loading = true;
    this.collections = [];

    if (!this.guildContext) {
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
}
