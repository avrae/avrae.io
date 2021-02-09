import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {GvarsComponent} from './gvars.component';

describe('GvarsComponent', () => {
  let component: GvarsComponent;
  let fixture: ComponentFixture<GvarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GvarsComponent]
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
