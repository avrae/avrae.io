import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedThumbnailComponent} from './embed-thumbnail.component';

describe('EmbedThumbnailComponent', () => {
  let component: EmbedThumbnailComponent;
  let fixture: ComponentFixture<EmbedThumbnailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedThumbnailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
