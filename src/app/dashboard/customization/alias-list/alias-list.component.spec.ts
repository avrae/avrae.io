import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AliasListComponent} from './alias-list.component';

describe('AliasListComponent', () => {
  let component: AliasListComponent;
  let fixture: ComponentFixture<AliasListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AliasListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
