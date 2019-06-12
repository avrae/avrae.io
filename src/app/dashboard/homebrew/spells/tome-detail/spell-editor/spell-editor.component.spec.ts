import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpellEditorComponent} from './spell-editor.component';

describe('SpellEditorComponent', () => {
  let component: SpellEditorComponent;
  let fixture: ComponentFixture<SpellEditorComponent>;

  beforeEach(async(() => {
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
