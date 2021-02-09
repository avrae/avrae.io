import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpellPanelDescriptionComponent} from './spell-panel-description.component';

describe('SpellPanelDescriptionComponent', () => {
  let component: SpellPanelDescriptionComponent;
  let fixture: ComponentFixture<SpellPanelDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpellPanelDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellPanelDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
