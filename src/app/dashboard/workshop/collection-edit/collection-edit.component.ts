import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscordUser} from '../../../schemas/Discord';
import {PublicationState, WorkshopCollectionFull} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {getUser} from '../../APIHelper';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['../common.scss', './collection-edit.component.css', '../collection/collection.component.scss']
})
export class CollectionEditComponent implements OnInit {
  // exports
  PublicationState = PublicationState;

  // data
  collection: WorkshopCollectionFull;
  owner: DiscordUser;
  editors: DiscordUser[];

  // state
  loading = true;
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private workshopService: WorkshopService, private discordService: DiscordService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.loadCollection(params.get('id'))
    );
  }

  // event listeners
  onCollectionInit(collection: WorkshopCollectionFull) {
    this.collection = collection;
    this.editors = [];
    this.loadOwner();
    this.loadEditors();
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
        this.owner = response;
      });
  }

  loadEditors() {
    this.workshopService.getCollectionEditors(this.collection._id)
      .subscribe(response => {
        if (response.success) {
          this.editors = response.data;
        }
      });
  }

  // helpers
  canEdit(): boolean {
    return this.editors?.some(editor => editor.id === getUser().id);
  }
}
