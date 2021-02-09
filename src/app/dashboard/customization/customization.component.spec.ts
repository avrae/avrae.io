import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CustomizationComponent} from './customization.component';

describe('CustomizationComponent', () => {
  let component: CustomizationComponent;
  let fixture: ComponentFixture<CustomizationComponent>;

  beforeEach(waitForAsync(() => {
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
