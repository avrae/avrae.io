import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedAuthorComponent } from './embed-author.component';

describe('EmbedAuthorComponent', () => {
  let component: EmbedAuthorComponent;
  let fixture: ComponentFixture<EmbedAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
