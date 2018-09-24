import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackImportDialog } from './pack-import-dialog.component';

describe('PackImportDialog', () => {
  let component: PackImportDialog;
  let fixture: ComponentFixture<PackImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackImportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
