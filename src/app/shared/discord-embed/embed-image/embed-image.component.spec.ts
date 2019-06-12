import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmbedImageComponent} from './embed-image.component';

describe('EmbedImageComponent', () => {
  let component: EmbedImageComponent;
  let fixture: ComponentFixture<EmbedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
