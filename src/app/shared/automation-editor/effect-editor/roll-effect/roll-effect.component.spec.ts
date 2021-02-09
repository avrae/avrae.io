import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RollEffectComponent } from './roll-effect.component';

describe('RollEffectComponent', () => {
  let component: RollEffectComponent;
  let fixture: ComponentFixture<RollEffectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RollEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
