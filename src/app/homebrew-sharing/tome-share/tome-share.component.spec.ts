import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TomeShareComponent } from './tome-share.component';

describe('TomeShareComponent', () => {
  let component: TomeShareComponent;
  let fixture: ComponentFixture<TomeShareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TomeShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
