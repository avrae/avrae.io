import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackMarkdownDialog} from './pack-markdown-dialog.component';

describe('PackMarkdownDialog', () => {
  let component: PackMarkdownDialog;
  let fixture: ComponentFixture<PackMarkdownDialog>;

  beforeEach(async(() => {
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
