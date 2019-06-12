import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEffectComponent } from './save-effect.component';

describe('SaveEffectComponent', () => {
  let component: SaveEffectComponent;
  let fixture: ComponentFixture<SaveEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
