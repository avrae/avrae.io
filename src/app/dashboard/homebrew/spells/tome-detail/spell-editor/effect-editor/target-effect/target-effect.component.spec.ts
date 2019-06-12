import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEffectComponent } from './target-effect.component';

describe('TargetEffectComponent', () => {
  let component: TargetEffectComponent;
  let fixture: ComponentFixture<TargetEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
