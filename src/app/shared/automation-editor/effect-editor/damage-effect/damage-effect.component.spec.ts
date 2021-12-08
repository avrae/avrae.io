import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DamageEffectComponent } from './damage-effect.component';

describe('DamageEffectComponent', () => {
  let component: DamageEffectComponent;
  let fixture: ComponentFixture<DamageEffectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
