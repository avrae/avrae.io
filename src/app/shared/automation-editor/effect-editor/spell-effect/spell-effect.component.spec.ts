import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellEffectComponent } from './spell-effect.component';

describe('SpellEffectComponent', () => {
  let component: SpellEffectComponent;
  let fixture: ComponentFixture<SpellEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
