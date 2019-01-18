import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTomeDialog} from './new-tome-dialog.component';

describe('NewTomeDialog', () => {
  let component: NewTomeDialog;
  let fixture: ComponentFixture<NewTomeDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTomeDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTomeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
