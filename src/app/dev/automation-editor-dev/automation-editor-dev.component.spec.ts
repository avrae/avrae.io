import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationEditorDevComponent } from './automation-editor-dev.component';

describe('AutomationEditorDevComponent', () => {
  let component: AutomationEditorDevComponent;
  let fixture: ComponentFixture<AutomationEditorDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomationEditorDevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationEditorDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
