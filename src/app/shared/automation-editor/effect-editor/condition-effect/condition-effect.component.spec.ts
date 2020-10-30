import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionEffectComponent } from './condition-effect.component';

describe('ConditionEffectComponent', () => {
  let component: ConditionEffectComponent;
  let fixture: ComponentFixture<ConditionEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
