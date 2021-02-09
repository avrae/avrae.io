import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedColorPillComponent} from './embed-color-pill.component';

describe('EmbedColorPillComponent', () => {
  let component: EmbedColorPillComponent;
  let fixture: ComponentFixture<EmbedColorPillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedColorPillComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedColorPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
