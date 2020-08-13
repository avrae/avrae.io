import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopCollection, WorkshopTag} from '../../schemas/Workshop';
import {WorkshopService} from './workshop.service';

@Component({
  selector: 'avr-workshop',
  templateUrl: './workshop-explore.component.html',
  styleUrls: ['./workshop-explore.component.scss']
})
export class WorkshopExploreComponent implements OnInit {
  COLLECTIONS_PER_PAGE = 48;

  // explore params
  order: string;
  tags: WorkshopTag[] = [];
  q: string;
  page: number;

  // state
  loading = true;
  collections: WorkshopCollection[] = [];
  validTags: WorkshopTag[];
  filteredTags: WorkshopTag[] = [];
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
      this.filteredTags = this.validTags;
      return;
    }
    this.filteredTags = this.validTags.filter(tag => tag.name.toLowerCase().startsWith(search.toLowerCase()));
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
