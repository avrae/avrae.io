import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpellEmbedComponent} from './spell-embed.component';

describe('SpellEmbedComponent', () => {
  let component: SpellEmbedComponent;
  let fixture: ComponentFixture<SpellEmbedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpellEmbedComponent]
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
