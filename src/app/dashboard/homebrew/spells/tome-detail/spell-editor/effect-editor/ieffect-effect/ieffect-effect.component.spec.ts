import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IEffectEffectComponent } from './ieffect-effect.component';

describe('IEffectEffectComponent', () => {
  let component: IEffectEffectComponent;
  let fixture: ComponentFixture<IEffectEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IEffectEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IEffectEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
