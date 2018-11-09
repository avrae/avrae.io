import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomeDeleteDialog } from './tome-delete-dialog.component';

describe('TomeDeleteDialog', () => {
  let component: TomeDeleteDialog;
  let fixture: ComponentFixture<TomeDeleteDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeDeleteDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
