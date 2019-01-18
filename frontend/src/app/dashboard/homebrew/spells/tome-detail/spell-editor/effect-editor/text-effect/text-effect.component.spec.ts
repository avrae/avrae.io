import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEffectComponent } from './text-effect.component';

describe('TextEffectComponent', () => {
  let component: TextEffectComponent;
  let fixture: ComponentFixture<TextEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
