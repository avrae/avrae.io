import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiscordEmbedComponent} from './discord-embed.component';

describe('DiscordEmbedComponent', () => {
  let component: DiscordEmbedComponent;
  let fixture: ComponentFixture<DiscordEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscordEmbedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
