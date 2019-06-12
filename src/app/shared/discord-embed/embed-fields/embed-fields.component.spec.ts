import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmbedFieldsComponent} from './embed-fields.component';

describe('EmbedFieldsComponent', () => {
  let component: EmbedFieldsComponent;
  let fixture: ComponentFixture<EmbedFieldsComponent>;

  beforeEach(async(() => {
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
