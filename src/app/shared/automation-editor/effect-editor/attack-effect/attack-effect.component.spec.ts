import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackEffectComponent } from './attack-effect.component';

describe('AttackEffectComponent', () => {
  let component: AttackEffectComponent;
  let fixture: ComponentFixture<AttackEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
