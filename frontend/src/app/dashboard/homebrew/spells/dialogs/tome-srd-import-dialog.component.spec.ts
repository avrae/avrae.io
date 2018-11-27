import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TomeSRDImportDialog} from './tome-srd-import-dialog.component';

describe('TomeSRDImportDialog', () => {
  let component: TomeSRDImportDialog;
  let fixture: ComponentFixture<TomeSRDImportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TomeSRDImportDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeSRDImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
