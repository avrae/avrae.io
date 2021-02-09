import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {NewTomeDialog} from './new-tome-dialog.component';

describe('NewTomeDialog', () => {
  let component: NewTomeDialog;
  let fixture: ComponentFixture<NewTomeDialog>;

  beforeEach(waitForAsync(() => {
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
