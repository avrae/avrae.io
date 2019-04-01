import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumMetaComponent } from './compendium-meta.component';

describe('CompendiumMetaComponent', () => {
  let component: CompendiumMetaComponent;
  let fixture: ComponentFixture<CompendiumMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendiumMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
