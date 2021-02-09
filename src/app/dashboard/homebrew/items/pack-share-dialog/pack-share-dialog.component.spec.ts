import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PackShareDialog} from './pack-share-dialog.component';

describe('TomeShareDialog', () => {
  let component: PackShareDialog;
  let fixture: ComponentFixture<PackShareDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PackShareDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackShareDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
