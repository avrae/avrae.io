import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationEditorComponent } from './automation-editor.component';

describe('AutomationEditorComponent', () => {
  let component: AutomationEditorComponent;
  let fixture: ComponentFixture<AutomationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
