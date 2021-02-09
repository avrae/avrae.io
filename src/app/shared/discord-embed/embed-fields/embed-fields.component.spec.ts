import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EmbedFieldsComponent} from './embed-fields.component';

describe('EmbedFieldsComponent', () => {
  let component: EmbedFieldsComponent;
  let fixture: ComponentFixture<EmbedFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedFieldsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
