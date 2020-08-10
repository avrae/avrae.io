import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopCollection, WorkshopTag} from '../../schemas/Workshop';
import {WorkshopService} from './workshop.service';

@Component({
  selector: 'avr-workshop',
  templateUrl: './workshop-explore.component.html',
  styleUrls: ['./workshop-explore.component.css']
})
export class WorkshopExploreComponent implements OnInit {

  // explore params
  order: string;
  tags: string[];
  q: string;
  page: number;

  // state
  loading = false;
  collections: WorkshopCollection[];
  validTags: WorkshopTag[];
  filteredTags: WorkshopTag[] = [];
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    // populate options from query string
    this.order = this.route.snapshot.queryParamMap.get('order') || 'popular-1w';
    this.tags = this.route.snapshot.queryParamMap.get('tags')?.split(',') || [];
    this.q = this.route.snapshot.queryParamMap.get('q');
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');

    // populate page
    this.loadValidTags();
    this.refresh();
  }

  // event handlers
  onOrderChange() {
    this.addQueryParams({order: this.order});
    this.refresh();
  }

  onSearch() {
    this.addQueryParams({q: this.q || null});
    this.refresh();
  }

  onTagAdd(tag) {

  }

  onTagRemove(tag) {

  }

  // data loaders
  refresh() {
    this.loading = true;
    this.workshopService.getWorkshopExplore(this.order, this.tags, this.q, this.page)
      .subscribe(response => {
        if (response.success) {
          this.collections = [];
          this.loadCollectionsFromIds(response.data);
        } else {
          this.error = response.error;
        }
      });
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
            // ensure the collections populate in the order returned by the API
            this.collections.sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id));
            if (this.collections.length >= ids.length) {
              this.loading = false;
            }
          } else {
            this.error = response.error;
          }
        });
    });
  }

  loadValidTags() {
    this.workshopService.getTags()
      .subscribe(result => {
        if (result.success) {
          this.validTags = result.data;
          this.filterTags();
        } else {
          this.error = result.error;
        }
      });
  }

  // helpers
  filterTags() {
    if (!this.validTags) {
      this.filteredTags = [];
      return;
    }
    if (!this.q) {
      this.filteredTags = this.validTags;
      return;
    }
    this.filteredTags = this.validTags.filter(tag => tag.name.toLowerCase().startsWith(this.q.toLowerCase()));
  }

  addQueryParams(params) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
  }
}
