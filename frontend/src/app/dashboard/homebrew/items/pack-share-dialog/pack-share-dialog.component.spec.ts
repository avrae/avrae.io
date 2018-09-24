import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackShareDialog } from './pack-share-dialog.component';

describe('PackShareDialog', () => {
  let component: PackShareDialog;
  let fixture: ComponentFixture<PackShareDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackShareDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackShareDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
