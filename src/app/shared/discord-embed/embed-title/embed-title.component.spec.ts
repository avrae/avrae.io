import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedTitleComponent} from './embed-title.component';

describe('EmbedTitleComponent', () => {
  let component: EmbedTitleComponent;
  let fixture: ComponentFixture<EmbedTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
