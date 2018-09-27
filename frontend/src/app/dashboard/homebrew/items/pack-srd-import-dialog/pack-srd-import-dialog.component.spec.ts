import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackSRDImportDialog } from './pack-srd-import-dialog.component';

describe('PackSRDImportDialog', () => {
  let component: PackSRDImportDialog;
  let fixture: ComponentFixture<PackSRDImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackSRDImportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackSRDImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
