import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SnippetListComponent} from './snippet-list.component';

describe('SnippetListComponent', () => {
  let component: SnippetListComponent;
  let fixture: ComponentFixture<SnippetListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
