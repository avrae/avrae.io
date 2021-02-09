import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PackOptionsDialog} from './pack-options-dialog.component';

describe('PackOptionsDialog', () => {
  let component: PackOptionsDialog;
  let fixture: ComponentFixture<PackOptionsDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PackOptionsDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackOptionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
