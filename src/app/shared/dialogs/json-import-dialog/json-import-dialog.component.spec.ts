import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONImportDialog } from './json-import-dialog.component';

describe('TomeJSONImportDialog', () => {
  let component: JSONImportDialog;
  let fixture: ComponentFixture<JSONImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONImportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
