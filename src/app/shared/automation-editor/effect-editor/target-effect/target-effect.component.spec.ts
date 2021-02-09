import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TargetEffectComponent } from './target-effect.component';

describe('TargetEffectComponent', () => {
  let component: TargetEffectComponent;
  let fixture: ComponentFixture<TargetEffectComponent>;

  beforeEach(waitForAsync(() => {
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
