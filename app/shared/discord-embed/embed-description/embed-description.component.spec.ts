import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmbedDescriptionComponent} from './embed-description.component';

describe('EmbedDescriptionComponent', () => {
  let component: EmbedDescriptionComponent;
  let fixture: ComponentFixture<EmbedDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
