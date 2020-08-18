import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptionsComponent } from './my-subscriptions.component';

describe('MySubscriptionsComponent', () => {
  let component: MySubscriptionsComponent;
  let fixture: ComponentFixture<MySubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
