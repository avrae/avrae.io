import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumDetailComponent } from './compendium-detail.component';

describe('CompendiumDetailComponent', () => {
  let component: CompendiumDetailComponent;
  let fixture: ComponentFixture<CompendiumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendiumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
