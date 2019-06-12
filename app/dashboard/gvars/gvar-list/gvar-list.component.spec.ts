import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GvarListComponent} from './gvar-list.component';

describe('GvarListComponent', () => {
  let component: GvarListComponent;
  let fixture: ComponentFixture<GvarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GvarListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
