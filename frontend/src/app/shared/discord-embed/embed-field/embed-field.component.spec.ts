import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedFieldComponent } from './embed-field.component';

describe('EmbedFieldComponent', () => {
  let component: EmbedFieldComponent;
  let fixture: ComponentFixture<EmbedFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
