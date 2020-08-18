import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['../common.scss', './my-work.component.scss']
})
export class MyWorkComponent implements OnInit {

  // state
  loadingOwned = true;
  loadingEditable = true;
  collections: WorkshopCollection[] = [];
  error: string;
  order = 'edittime';

  constructor(private route: ActivatedRoute, private router: Router, private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  // event handlers
  onOrderChange() {
    this.sortCollections();
  }

  // data loaders
  loadCollections() {
    this.error = null;
    this.loadingOwned = true;
    this.loadingEditable = true;
    this.collections = [];

    this.workshopService.getOwnedCollectionIds()
      .subscribe(response => {
        if (response.success) {
          this.loadCollectionsFromIds(response.data, true);
        } else {
          this.error = response.error;
        }
      });
    this.workshopService.getEditableCollectionIds()
      .subscribe(response => {
        if (response.success) {
          this.loadCollectionsFromIds(response.data, false);
        } else {
          this.error = response.error;
        }
      });
  }

  loadCollectionsFromIds(ids: string[], isOwned: boolean) {
    if (ids.length === 0) {
      isOwned ? this.loadingOwned = false : this.loadingEditable = false;
    }

    ids.forEach(id => {
      this.workshopService.getCollection(id)
        .subscribe(response => {
          if (response.success) {
            this.collections.push(response.data);
            // ensure the collections populate in the requested order
            this.sortCollections();
            if (this.collections.length >= ids.length) {
              isOwned ? this.loadingOwned = false : this.loadingEditable = false;
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
