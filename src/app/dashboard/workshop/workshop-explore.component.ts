import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {groupBy} from 'lodash';
import {WorkshopCollection, WorkshopTag} from '../../schemas/Workshop';
import {WorkshopService} from './workshop.service';

@Component({
  selector: 'avr-workshop',
  templateUrl: './workshop-explore.component.html',
  styleUrls: ['./common.scss', './workshop-explore.component.scss']
})
export class WorkshopExploreComponent implements OnInit {
  COLLECTIONS_PER_PAGE = 48;

  // explore params
  order: string;
  tags: WorkshopTag[] = [];  // tags in current query
  q: string;
  page: number;

  // state
  loading = true;
  collections: WorkshopCollection[] = [];
  validTags: WorkshopTag[];  // all valid tags
  filteredTags: [string, WorkshopTag[]][] = [];  // list of tuples of (category, tags) of tags that match query in search
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    // populate options from query string
    this.order = this.route.snapshot.queryParamMap.get('order') || 'popular-1w';
    this.q = this.route.snapshot.queryParamMap.get('q');
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    // tags populated after tag loading

    // populate page (tag load also refreshes)
    this.loadValidTags();
  }

  // event handlers
  onOrderChange() {
    this.refresh();
  }

  onSearch(search) {
    this.q = search;
    if (search) {
      this.order = 'relevance';
    } else if (this.order === 'relevance') {
      this.order = 'popular-1w';
    }
    this.refresh();
  }

  onSearchClear() {
    this.tags = [];
    this.onSearch(null);
  }

  onTagAdd(tag: WorkshopTag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.refresh();
    }
  }

  onTagRemove(tag: WorkshopTag) {
    if (this.tags.includes(tag)) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.refresh();
    }
  }

  onPreviousPage() {
    this.page--;
    this.refresh();
  }

  onNextPage() {
    this.page++;
    this.refresh();
  }

  // data loaders
  refresh() {
    this.error = null;

    // set query params
    this.addQueryParams({
      order: this.order,
      q: this.q || null,
      tags: this.tags.map(tag => tag.slug).join(',') || null,
      page: this.page
    });

    this.loading = true;
    const tags = this.tags.map(tag => tag.slug);
    this.workshopService.getWorkshopExplore(this.order, tags, this.q, this.page)
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
    } else {
      this.workshopService.getCollectionsBatched(ids)
        .subscribe(response => {
          if (response.success) {
            this.collections.push(...response.data);
            this.loading = false;
          } else {
            this.error = response.error;
          }
        });
    }
  }

  loadValidTags() {
    this.workshopService.getTags()
      .subscribe(result => {
        if (result.success) {
          // tags are alphabetically sorted
          this.validTags = result.data.sort((a, b) => a.name.localeCompare(b.name));

          // load tags from query string
          const querySlugs = this.route.snapshot.queryParamMap.get('tags')?.split(',') || [];
          this.tags.push(...this.validTags.filter(t => querySlugs.includes(t.slug)));

          this.filterTags(this.q);
          this.refresh();
        } else {
          this.error = result.error;
        }
      });
  }

  // helpers
  filterTags(search) {
    if (!this.validTags) {
      this.filteredTags = [];
      return;
    }
    if (!search) {
      this.filteredTags = Object.entries(groupBy(this.validTags, tag => tag.category));
      return;
    }
    this.filteredTags = Object.entries(groupBy(
      this.validTags.filter(tag => tag.name.toLowerCase().startsWith(search.toLowerCase())),
      tag => tag.category
    ));
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
