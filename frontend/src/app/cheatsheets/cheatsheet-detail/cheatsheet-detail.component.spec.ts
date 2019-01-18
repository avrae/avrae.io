import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetDetailComponent } from './cheatsheet-detail.component';

describe('CheatsheetDetailComponent', () => {
  let component: CheatsheetDetailComponent;
  let fixture: ComponentFixture<CheatsheetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheatsheetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheatsheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
