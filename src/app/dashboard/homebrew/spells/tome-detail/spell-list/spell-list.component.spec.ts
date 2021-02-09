import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpellListComponent} from './spell-list.component';

describe('SpellListComponent', () => {
  let component: SpellListComponent;
  let fixture: ComponentFixture<SpellListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpellListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
