import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TomeDeleteDialog} from './tome-delete-dialog.component';

describe('TomeDeleteDialog', () => {
  let component: TomeDeleteDialog;
  let fixture: ComponentFixture<TomeDeleteDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TomeDeleteDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
