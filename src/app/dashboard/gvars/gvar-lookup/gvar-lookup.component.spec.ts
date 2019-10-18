import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GvarLookupComponent } from './gvar-lookup.component';

describe('GvarLookupComponent', () => {
  let component: GvarLookupComponent;
  let fixture: ComponentFixture<GvarLookupComponent>;

  beforeEach(async(() => {
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
