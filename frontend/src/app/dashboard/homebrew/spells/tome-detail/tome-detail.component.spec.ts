import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TomeDetailComponent} from './tome-detail.component';

describe('TomeDetailComponent', () => {
  let component: TomeDetailComponent;
  let fixture: ComponentFixture<TomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TomeDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
