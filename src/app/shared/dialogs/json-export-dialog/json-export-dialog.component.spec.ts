import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JSONExportDialog } from './json-export-dialog.component';

describe('TomeJSONDialog', () => {
  let component: JSONExportDialog;
  let fixture: ComponentFixture<JSONExportDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONExportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONExportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
