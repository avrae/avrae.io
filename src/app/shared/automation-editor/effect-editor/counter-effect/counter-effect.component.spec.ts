import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterEffectComponent } from './counter-effect.component';

describe('CounterEffectComponent', () => {
  let component: CounterEffectComponent;
  let fixture: ComponentFixture<CounterEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
