import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TempHPEffectComponent } from './temphp-effect.component';

describe('TempHPEffectComponent', () => {
  let component: TempHPEffectComponent;
  let fixture: ComponentFixture<TempHPEffectComponent>;

  beforeEach(waitForAsync(() => {
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
