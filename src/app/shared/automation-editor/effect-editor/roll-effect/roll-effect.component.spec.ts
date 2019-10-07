import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollEffectComponent } from './roll-effect.component';

describe('RollEffectComponent', () => {
  let component: RollEffectComponent;
  let fixture: ComponentFixture<RollEffectComponent>;

  beforeEach(async(() => {
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
