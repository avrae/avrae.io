import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewDialog} from './new-dialog.component';

describe('NewDialog', () => {
  let component: NewDialog;
  let fixture: ComponentFixture<NewDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
