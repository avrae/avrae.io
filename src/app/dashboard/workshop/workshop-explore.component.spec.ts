import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkshopExploreComponent } from './workshop-explore.component';

describe('WorkshopComponent', () => {
  let component: WorkshopExploreComponent;
  let fixture: ComponentFixture<WorkshopExploreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
