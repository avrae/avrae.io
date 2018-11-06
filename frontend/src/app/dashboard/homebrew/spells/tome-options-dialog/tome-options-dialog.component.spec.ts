import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomeOptionsDialog } from './tome-options-dialog.component';

describe('TomeOptionsDialog', () => {
  let component: TomeOptionsDialog;
  let fixture: ComponentFixture<TomeOptionsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeOptionsDialog ]
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
