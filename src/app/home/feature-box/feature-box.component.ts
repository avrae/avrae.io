import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss']
})
export class FeatureBoxComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
