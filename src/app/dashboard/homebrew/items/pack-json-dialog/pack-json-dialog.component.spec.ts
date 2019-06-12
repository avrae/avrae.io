import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackJsonDialog} from './pack-json-dialog.component';

describe('PackJsonDialog', () => {
  let component: PackJsonDialog;
  let fixture: ComponentFixture<PackJsonDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PackJsonDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackJsonDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
