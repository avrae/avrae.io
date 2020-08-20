import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {PartialGuild} from '../../../schemas/Discord';
import {WorkshopCollection} from '../../../schemas/Workshop';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../common.scss', './collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // state
  collection: WorkshopCollection;
  loading = true;
  error: string;
  guildContext: PartialGuild | null;

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
              private location: Location,
              private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.loadCollection(params.get('id'))
    );
  }

  onGuildContextChange(guild: PartialGuild | null) {
    this.guildContext = guild;
    if (this.guildContext) {
      this.workshopService.getGuildPermissionCheck(this.guildContext.id)
        .subscribe(response => {
          if (response.success && !response.data.can_edit) {
            this.error = `You do not have permission to edit server collections on ${this.guildContext.name}.
          You will be unable to change subscriptions or edit bindings.`;
          }
        });
    }
  }


  // data loaders
  loadCollection(id: string) {
    this.workshopService.getCollection(id)
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.collection = response.data;
        } else {
          this.error = response.error;
        }
      });
  }

  // helpers
  goBack() {
    this.location.back();
  }

}
