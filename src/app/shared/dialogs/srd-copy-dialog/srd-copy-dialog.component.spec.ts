import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SRDCopyDialog } from './srd-copy-dialog.component';

describe('SrdCopyDialogComponent', () => {
  let component: SRDCopyDialog;
  let fixture: ComponentFixture<SRDCopyDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SRDCopyDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SRDCopyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
