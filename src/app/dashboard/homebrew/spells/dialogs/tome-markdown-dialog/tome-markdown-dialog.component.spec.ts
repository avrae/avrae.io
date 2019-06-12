import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomeMarkdownDialog } from './tome-markdown-dialog.component';

describe('TomeMarkdownDialog', () => {
  let component: TomeMarkdownDialog;
  let fixture: ComponentFixture<TomeMarkdownDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeMarkdownDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeMarkdownDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
