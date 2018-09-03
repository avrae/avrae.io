import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialog } from './edit-dialog.component';

describe('EditDialog', () => {
  let component: EditDialog;
  let fixture: ComponentFixture<EditDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
