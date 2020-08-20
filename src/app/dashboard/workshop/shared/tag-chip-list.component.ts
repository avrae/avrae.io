import {Component, Input, OnInit} from '@angular/core';
import {WorkshopCollection, WorkshopTag} from '../../../schemas/Workshop';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-tag-chip-list',
  template: `
    <mat-chip-list aria-label="Tag list" class="collection-tags" *ngIf="tags?.length && collection.tags.length">
      <mat-chip *ngFor="let tag of limit ? collection.tags.slice(0, limit) : collection.tags">{{tagNameFromSlug(tag)}}</mat-chip>
      <mat-chip *ngIf="limit && collection.tags.length > limit">{{collection.tags.length - limit}} more...</mat-chip>
    </mat-chip-list>
  `
})
export class TagChipListComponent implements OnInit {

  @Input() collection: WorkshopCollection;  // the collection whose tags to display
  @Input() limit: number;                   // optional: the maximum number of tags to display (excess becomes "X more...")
  tags: WorkshopTag[];

  constructor(private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.workshopService.getTags()
      .subscribe(result => {
        if (result.success) {
          this.tags = result.data;
        }
      });
  }

  tagNameFromSlug(slug: string): string {
    if (this.tags.map(tag => tag.slug).includes(slug)) {
      return this.tags.find(tag => tag.slug === slug).name;
    } else {
      return slug;
    }
  }

}
