import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherLevelComponent } from './higher-level.component';

describe('HigherLevelComponent', () => {
  let component: HigherLevelComponent;
  let fixture: ComponentFixture<HigherLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigherLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
