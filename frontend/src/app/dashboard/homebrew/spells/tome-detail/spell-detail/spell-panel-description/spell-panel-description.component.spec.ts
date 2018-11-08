import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellPanelDescriptionComponent } from './spell-panel-description.component';

describe('SpellPanelDescriptionComponent', () => {
  let component: SpellPanelDescriptionComponent;
  let fixture: ComponentFixture<SpellPanelDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellPanelDescriptionComponent ]
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
