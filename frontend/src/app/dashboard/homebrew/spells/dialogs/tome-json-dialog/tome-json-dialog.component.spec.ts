import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomeJSONDialog } from './tome-json-dialog.component';

describe('TomeJSONDialog', () => {
  let component: TomeJSONDialog;
  let fixture: ComponentFixture<TomeJSONDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeJSONDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeJSONDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
