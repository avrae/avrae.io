import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscordUser, PartialGuild} from '../../../schemas/Discord';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../common.scss', './collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // state
  collection: WorkshopCollection;
  loading = true;
  error: string;
  guildContext: PartialGuild | null;
  editors: DiscordUser[];

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private location: Location,
              private workshopService: WorkshopService, private discordService: DiscordService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.loadCollection(params.get('id'))
    );
  }

  onGuildContextChange(guild: PartialGuild | null) {
    this.guildContext = guild;
    if (this.guildContext) {
      this.workshopService.getGuildPermissionCheck(this.guildContext.id)
        .subscribe(response => {
          if (response.success && !response.data.can_edit) {
            this.error = `You do not have permission to edit server collections on ${this.guildContext.name}.
          You will be unable to change subscriptions or edit bindings.`;
          }
        });
    }
  }

  onCollectionInit(collection: WorkshopCollection) {
    this.collection = collection;
    this.editors = [];
    this.loadOwner();
    this.loadEditors();
  }

  // data loaders
  loadCollection(id: string) {
    this.workshopService.getCollection(id)
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.onCollectionInit(response.data);
        } else {
          this.error = response.error;
        }
      });
  }

  loadOwner() {
    this.discordService.getUser(this.collection.owner)
      .subscribe(response => {
        this.editors.unshift(response);
      });
  }

  loadEditors() {
    this.workshopService.getCollectionEditors(this.collection._id)
      .subscribe(response => {
        if (response.success) {
          this.editors.push(...response.data);
        }
      });
  }

  // helpers
  goBack() {
    this.location.back();
  }

}
