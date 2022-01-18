import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLinksComponent } from './community-links.component';

describe('CommunityLinksComponent', () => {
  let component: CommunityLinksComponent;
  let fixture: ComponentFixture<CommunityLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
