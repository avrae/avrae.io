import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {UvarListComponent} from './uvar-list.component';

describe('UvarListComponent', () => {
  let component: UvarListComponent;
  let fixture: ComponentFixture<UvarListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UvarListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UvarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
