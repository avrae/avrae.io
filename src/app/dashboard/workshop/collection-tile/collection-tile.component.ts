import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as numeral from 'numeral';
import {DiscordUser} from '../../../schemas/Discord';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {CollectionSubscriber} from '../shared/collection-subscriber';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collection-tile',
  templateUrl: './collection-tile.component.html',
  styleUrls: ['../common.scss', './collection-tile.component.scss']
})
export class CollectionTileComponent extends CollectionSubscriber implements OnInit {

  @Input() collection: WorkshopCollection;
  @Input() showEdit: boolean = false;
  author: DiscordUser;

  constructor(private discord: DiscordService, private workshopService: WorkshopService,
              private snackBar: MatSnackBar) {
    super(snackBar, workshopService, discord);
  }

  ngOnInit(): void {
    this.author = {id: this.collection.owner, username: 'Loading...', avatarUrl: '../../../../assets/img/AvraeSquare.jpg'};
    this.loadAuthor();
  }

  // helpers
  getInitials(name: string): string {
    const match = name.match(/\b\w/g) || [];
    return (match.join('')).toUpperCase();
  }

  getNumberString(number: number): string {
    return numeral(number).format('0.[0]a');
  }

  isSubscribed() {
    return this.workshopService.personalSubscribedIds?.includes(this.collection._id);
  }

  // data loaders
  loadAuthor() {
    this.discord.getUser(this.collection.owner)
      .subscribe(user => this.author = user);
  }
}
