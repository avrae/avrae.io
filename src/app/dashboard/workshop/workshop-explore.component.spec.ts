import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopExploreComponent } from './workshop-explore.component';

describe('WorkshopComponent', () => {
  let component: WorkshopExploreComponent;
  let fixture: ComponentFixture<WorkshopExploreComponent>;

  beforeEach(async(() => {
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
