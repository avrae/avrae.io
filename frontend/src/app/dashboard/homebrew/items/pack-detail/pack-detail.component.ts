import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'avr-pack-detail',
  templateUrl: './pack-detail.component.html',
  styleUrls: ['./pack-detail.component.css']
})
export class PackDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
