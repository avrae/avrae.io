import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GvarLookupComponent } from './gvar-lookup.component';

describe('GvarLookupComponent', () => {
  let component: GvarLookupComponent;
  let fixture: ComponentFixture<GvarLookupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GvarLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvarLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
