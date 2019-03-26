import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumListComponent } from './compendium-list.component';

describe('CompendiumListComponent', () => {
  let component: CompendiumListComponent;
  let fixture: ComponentFixture<CompendiumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendiumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
