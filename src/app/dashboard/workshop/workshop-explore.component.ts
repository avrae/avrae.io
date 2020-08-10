import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WorkshopCollection} from '../../schemas/Workshop';
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
  loading: false;
  collections: WorkshopCollection[];

  constructor(private route: ActivatedRoute, private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    // populate options from query string
    this.order = this.route.snapshot.queryParamMap.get('order') || 'popular-1w';
    this.tags = this.route.snapshot.queryParamMap.get('tags')?.split(',') || [];
    this.q = this.route.snapshot.queryParamMap.get('q');
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');

    // populate page
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.workshopService.getWorkshopExplore(this.order, this.tags, this.q, this.page)
      .subscribe(response => {
        if (response.success) {
          this.collections = [];
          this.loadCollectionsFromIds(response.data);
        }
      });
  }

  loadCollectionsFromIds(ids: string[]) {
    ids.forEach(id => {
      this.workshopService.getCollection(id)
        .subscribe(response => {
          if (response.success) {
            this.collections.push(response.data);
            this.collections.sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id));
            if (this.collections.length >= ids.length) {
              this.loading = false;
            }
          }
        });
    });
  }

}
