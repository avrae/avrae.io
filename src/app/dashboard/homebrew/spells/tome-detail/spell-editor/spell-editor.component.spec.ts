import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpellEditorComponent} from './spell-editor.component';

describe('SpellEditorComponent', () => {
  let component: SpellEditorComponent;
  let fixture: ComponentFixture<SpellEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpellEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
