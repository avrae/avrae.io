import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PackDeleteDialog} from './pack-delete-dialog.component';

describe('PackDeleteDialog', () => {
  let component: PackDeleteDialog;
  let fixture: ComponentFixture<PackDeleteDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PackDeleteDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
