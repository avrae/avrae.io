import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomizationComponent} from './customization.component';

describe('CustomizationComponent', () => {
  let component: CustomizationComponent;
  let fixture: ComponentFixture<CustomizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
