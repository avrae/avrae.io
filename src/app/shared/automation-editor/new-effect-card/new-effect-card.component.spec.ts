import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewEffectCardComponent } from './new-effect-card.component';

describe('NewEffectCardComponent', () => {
  let component: NewEffectCardComponent;
  let fixture: ComponentFixture<NewEffectCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEffectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEffectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
