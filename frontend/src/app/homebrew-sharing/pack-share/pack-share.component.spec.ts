import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackShareComponent } from './pack-share.component';

describe('PackShareComponent', () => {
  let component: PackShareComponent;
  let fixture: ComponentFixture<PackShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
