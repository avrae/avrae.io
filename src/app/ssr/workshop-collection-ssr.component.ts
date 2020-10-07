import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {WorkshopService} from '../dashboard/workshop/workshop.service';
import {WorkshopCollection} from '../schemas/Workshop';

@Component({
  selector: 'avr-workshop-collection-ssr',
  template: ``,  // show the dark void of nothingness - servers don't care anyway
  styles: []
})
export class WorkshopCollectionSsrComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private meta: Meta,
              private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.loadCollection(params.get('id'))
    );
  }

  loadCollection(id: string) {
    this.workshopService.getCollection(id)
      .subscribe(response => {
        if (response.success) {
          this.setMetaFromCollection(response.data);
        }
      });
  }

  setMetaFromCollection(collection: WorkshopCollection) {
    this.meta.updateTag({
      name: 'description',
      content: `${collection.description}\nView ${collection.name} on the Alias Workshop.`.trim()
    });
    this.meta.updateTag(
      {property: 'og:title', content: collection.name}
    );
    this.meta.updateTag(
      {property: 'og:url', content: `${environment.baseURL}/${this.route.snapshot.url.join('/')}`}
    );
    this.meta.updateTag(
      {property: 'og:image', content: collection.image}
    );
    this.meta.updateTag({
      property: 'og:description',
      content: `${collection.description}\nView ${collection.name} on the Alias Workshop.`.trim()
    });
  }

}
