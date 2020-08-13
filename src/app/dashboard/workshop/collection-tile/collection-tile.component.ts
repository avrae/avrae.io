import {Component, Input, OnInit} from '@angular/core';
import * as numeral from 'numeral';
import {DiscordUser} from '../../../schemas/DiscordUser';
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
  author: DiscordUser;
  tags: WorkshopTag[];

  constructor(private discord: DiscordService, private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.author = {id: this.collection.owner, username: 'Loading...', avatarUrl: '../../../../assets/img/AvraeSquare.jpg'};
    this.loadAuthor();
    this.loadTags();
  }

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

}
