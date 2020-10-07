import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {DiscordUser, PartialGuild} from '../../../schemas/Discord';
import {WorkshopBindings, WorkshopCollectionFull} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {debrace} from '../../../shared/DisplayUtils';
import {getUser} from '../../APIHelper';
import {CollectionSubscriber} from '../shared/collection-subscriber';
import {WorkshopService} from '../workshop.service';
import {EditBindingsDialogComponent} from './edit-bindings-dialog/edit-bindings-dialog.component';

@Component({
  selector: 'avr-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../common.scss', './collection.component.scss']
})
export class CollectionComponent extends CollectionSubscriber implements OnInit {
  // exports
  debrace = debrace;

  // data
  collection: WorkshopCollectionFull;
  editors: DiscordUser[];
  bindings: WorkshopBindings | null;  // personal or guild, based on guildContext

  // state
  loading = true;
  error: string;
  guildContext: PartialGuild | null;

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private dialog: MatDialog, private location: Location, private meta: Meta,
              private workshopService: WorkshopService, private discordService: DiscordService) {
    super(snackBar, workshopService, discordService);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.loadCollection(params.get('id'))
    );
  }

  // event listeners
  onGuildContextChange(guild: PartialGuild | null) {
    this.guildContext = guild;
    this.error = null;
    this.loadBindings();
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

  onCollectionInit(collection: WorkshopCollectionFull) {
    this.collection = collection;
    this.editors = [];
    this.loadOwner();
    this.loadEditors();
    this.loadBindings();
    this.updateMeta();
  }

  onEditBindings() {
    const dialogRef = this.dialog.open(EditBindingsDialogComponent, {
      disableClose: true,
      data: {collection: this.collection, guildContext: this.guildContext, bindings: this.bindings},
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.bindings = result;
          this.snackBar.open('Updated bindings!');
        }
      });
  }

  // subscribe methods: update bindings in current context
  onSubscribe() {
    this.doSubscribe().subscribe(resp => {
      if (resp.success && !this.guildContext) {
        this.bindings = resp.data;
      }
    });
  }

  onUnsubscribe() {
    this.doUnsubscribe().subscribe(resp => {
      if (resp.success && !this.guildContext) {
        this.bindings = null;
      }
    });
  }

  onGuildSubscribe(guild: PartialGuild) {
    this.doGuildSubscribe(guild).subscribe(resp => {
      if (resp.success && this.guildContext.id === guild.id) {
        this.bindings = resp.data;
      }
    });
  }

  // data loaders
  loadCollection(id: string) {
    this.workshopService.getCollectionFull(id)
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

  loadBindings() {
    let bindingRequest;
    this.bindings = null;
    if (this.guildContext) {
      bindingRequest = this.workshopService.getGuildSubscription(this.collection._id, this.guildContext.id);
    } else {
      bindingRequest = this.workshopService.getMySubscription(this.collection._id);
    }
    bindingRequest.subscribe(response => {
      if (response.success) {
        this.bindings = response.data;
      }
    });
  }

  // helpers
  canEdit(): boolean {
    return this.editors?.some(editor => editor.id === getUser().id);
  }

  goBack() {
    this.location.back();
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content: `${this.collection.description}\nView ${this.collection.name} on Avrae Homebrew.`.trim()
    });
    this.meta.updateTag(
      {property: 'og:title', content: this.collection.name}
    );
    this.meta.updateTag(
      {property: 'og:url', content: `${environment.baseURL}/${this.route.snapshot.url.join('/')}`}
    );
    this.meta.updateTag(
      {property: 'og:image', content: this.collection.image}
    );
    this.meta.updateTag({
      property: 'og:description',
      content: `${this.collection.description}\nView ${this.collection.name} on Avrae Homebrew.`.trim()
    });
  }
}
