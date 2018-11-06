import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellDetailComponent } from './spell-detail.component';

describe('SpellDetailComponent', () => {
  let component: SpellDetailComponent;
  let fixture: ComponentFixture<SpellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
