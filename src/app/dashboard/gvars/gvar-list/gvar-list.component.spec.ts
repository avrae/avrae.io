import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {GvarListComponent} from './gvar-list.component';

describe('GvarListComponent', () => {
  let component: GvarListComponent;
  let fixture: ComponentFixture<GvarListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GvarListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
