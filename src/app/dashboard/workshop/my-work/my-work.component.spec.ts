import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkComponent } from './my-work.component';

describe('MyWorkComponent', () => {
  let component: MyWorkComponent;
  let fixture: ComponentFixture<MyWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
