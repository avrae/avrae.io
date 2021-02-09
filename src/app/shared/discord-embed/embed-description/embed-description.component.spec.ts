import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedDescriptionComponent} from './embed-description.component';

describe('EmbedDescriptionComponent', () => {
  let component: EmbedDescriptionComponent;
  let fixture: ComponentFixture<EmbedDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
