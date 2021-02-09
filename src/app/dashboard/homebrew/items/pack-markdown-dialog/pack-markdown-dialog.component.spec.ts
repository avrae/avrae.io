import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PackMarkdownDialog} from './pack-markdown-dialog.component';

describe('PackMarkdownDialog', () => {
  let component: PackMarkdownDialog;
  let fixture: ComponentFixture<PackMarkdownDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PackMarkdownDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackMarkdownDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
