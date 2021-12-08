import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedImageComponent} from './embed-image.component';

describe('EmbedImageComponent', () => {
  let component: EmbedImageComponent;
  let fixture: ComponentFixture<EmbedImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
