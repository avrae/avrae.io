import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, Input, OnInit} from '@angular/core';
import {BreakpointBaseComponent} from '../../shared/breakpoints';

@Component({
  selector: 'avr-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss']
})
export class FeatureBoxComponent extends BreakpointBaseComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;
  @Input() image_left = true;

  constructor(private bp: BreakpointObserver) {
    super(bp);
  }

  ngOnInit(): void {
  }

}
