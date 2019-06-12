import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmbedFooterComponent} from './embed-footer.component';

describe('EmbedFooterComponent', () => {
  let component: EmbedFooterComponent;
  let fixture: ComponentFixture<EmbedFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
