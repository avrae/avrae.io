import {Component, OnInit} from '@angular/core';
import {CollectableDisplayComponent} from '../../collectable-display/collectable-display.component';
import {WorkshopService} from '../../workshop.service';

@Component({
  selector: 'avr-collectable-edit',
  templateUrl: './collectable-edit.component.html',
  styleUrls: ['./collectable-edit.component.scss', '../../collectable-display/collectable-display.component.scss']
})
export class CollectableEditComponent extends CollectableDisplayComponent implements OnInit {

  constructor(public workshopService: WorkshopService) {
    super(workshopService);
  }

  ngOnInit(): void {
  }

  // event handlers
  onEdit() {

  }

  onCreateNew() {

  }
}
