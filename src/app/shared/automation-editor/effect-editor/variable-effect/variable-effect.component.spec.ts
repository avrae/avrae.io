import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableEffectComponent } from './variable-effect.component';

describe('VariableEffectComponent', () => {
  let component: VariableEffectComponent;
  let fixture: ComponentFixture<VariableEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
