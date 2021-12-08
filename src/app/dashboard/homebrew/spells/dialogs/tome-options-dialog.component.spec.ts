import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TomeOptionsDialog} from './tome-options-dialog.component';

describe('TomeOptionsDialog', () => {
  let component: TomeOptionsDialog;
  let fixture: ComponentFixture<TomeOptionsDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TomeOptionsDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeOptionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
