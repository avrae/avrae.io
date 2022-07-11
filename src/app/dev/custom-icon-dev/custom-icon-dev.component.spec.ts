import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIconDevComponent } from './custom-icon-dev.component';

describe('CustomIconDevComponent', () => {
  let component: CustomIconDevComponent;
  let fixture: ComponentFixture<CustomIconDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIconDevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomIconDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
