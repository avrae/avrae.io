import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpellDetailComponent} from './spell-detail.component';

describe('SpellDetailComponent', () => {
  let component: SpellDetailComponent;
  let fixture: ComponentFixture<SpellDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpellDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
