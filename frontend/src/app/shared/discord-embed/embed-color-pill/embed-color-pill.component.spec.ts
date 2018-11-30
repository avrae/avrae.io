import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedColorPillComponent } from './embed-color-pill.component';

describe('EmbedColorPillComponent', () => {
  let component: EmbedColorPillComponent;
  let fixture: ComponentFixture<EmbedColorPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedColorPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedColorPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
