import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomeJSONImportDialog } from './tome-json-import-dialog.component';

describe('TomeJSONImportDialog', () => {
  let component: TomeJSONImportDialog;
  let fixture: ComponentFixture<TomeJSONImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeJSONImportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeJSONImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
