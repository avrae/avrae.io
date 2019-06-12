import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHPEffectComponent } from './temphp-effect.component';

describe('TempHPEffectComponent', () => {
  let component: TempHPEffectComponent;
  let fixture: ComponentFixture<TempHPEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempHPEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempHPEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
