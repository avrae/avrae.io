import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellEmbedComponent } from './spell-embed.component';

describe('SpellEmbedComponent', () => {
  let component: SpellEmbedComponent;
  let fixture: ComponentFixture<SpellEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
