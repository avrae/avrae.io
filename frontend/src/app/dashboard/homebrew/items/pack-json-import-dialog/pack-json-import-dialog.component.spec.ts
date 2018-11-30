import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackJSONImportDialog } from './pack-json-import-dialog.component';

describe('PackJSONImportDialog', () => {
  let component: PackJSONImportDialog;
  let fixture: ComponentFixture<PackJSONImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackJSONImportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackJSONImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
