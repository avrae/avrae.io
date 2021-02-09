import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureBoxComponent } from './feature-box.component';

describe('FeatureBoxComponent', () => {
  let component: FeatureBoxComponent;
  let fixture: ComponentFixture<FeatureBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
