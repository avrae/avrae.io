import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {groupBy} from 'lodash';
import {WorkshopCollection, WorkshopTag} from '../../../schemas/Workshop';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-tag-chip-list',
  template: `
    <mat-chip-list aria-label="Tag list" class="collection-tags" *ngIf="tags?.length && (collection.tags.length || showEdit)">
      <mat-chip *ngFor="let tag of limit ? collection.tags.slice(0, limit) : collection.tags"
                [removable]="showEdit" (removed)="onTagRemoved(tag)">
        {{tagNameFromSlug(tag)}}
        <mat-icon matChipRemove *ngIf="showEdit">cancel</mat-icon>
      </mat-chip>
      <mat-chip *ngIf="limit && collection.tags.length > limit">{{collection.tags.length - limit}} more...</mat-chip>
      <!-- add tag menu -->
      <div *ngIf="showEdit">
        <mat-chip [matMenuTriggerFor]="menu">Add Tag...</mat-chip>
        <mat-menu #menu="matMenu">
          <mat-optgroup *ngFor="let tup of addableTags" [label]="tup[0]">
            <mat-option *ngFor="let tag of tup[1]" (click)="onTagAdd(tag)">
              {{tag.name}}
            </mat-option>
          </mat-optgroup>
        </mat-menu>
      </div>
    </mat-chip-list>
  `
})
export class TagChipListComponent implements OnInit {

  @Input() collection: WorkshopCollection;  // the collection whose tags to display
  @Input() limit: number;                   // optional: the maximum number of tags to display (excess becomes "X more...")
  @Input() showEdit: boolean = false;       // optional: whether to show buttons to edit the tags (add / remove)

  @Output() tagRemove = new EventEmitter<string>();
  @Output() tagAdd = new EventEmitter<WorkshopTag>();
  tags: WorkshopTag[];
  addableTags: [string, WorkshopTag[]][] = [];

  constructor(private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  // event handlers
  onTagAdd(tag: WorkshopTag) {
    this.workshopService.addCollectionTag(this.collection._id, tag.slug)
      .subscribe(response => {
        if (response.success) {
          this.collection.tags = response.data;
          this.tagAdd.emit(tag);
          this.updateAddableTags();
        }
      });
  }

  onTagRemoved(tag: string) {
    this.workshopService.removeCollectionTag(this.collection._id, tag)
      .subscribe(response => {
        if (response.success) {
          this.collection.tags = response.data;
          this.tagRemove.emit(tag);
          this.updateAddableTags();
        }
      });
  }

  // data loaders
  loadTags() {
    this.workshopService.getTags()
      .subscribe(result => {
        if (result.success) {
          this.tags = result.data;
          this.updateAddableTags();
        }
      });
  }

  // helpers
  tagNameFromSlug(slug: string): string {
    if (this.tags.map(tag => tag.slug).includes(slug)) {
      return this.tags.find(tag => tag.slug === slug).name;
    } else {
      return slug;
    }
  }

  updateAddableTags() {
    this.addableTags = Object.entries(
      groupBy(
        this.tags.filter(tag => !this.collection.tags.includes(tag.slug)),
        tag => tag.category));
  }
}
