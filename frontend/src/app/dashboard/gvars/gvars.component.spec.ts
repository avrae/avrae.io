import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GvarsComponent } from './gvars.component';

describe('GvarsComponent', () => {
  let component: GvarsComponent;
  let fixture: ComponentFixture<GvarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GvarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
