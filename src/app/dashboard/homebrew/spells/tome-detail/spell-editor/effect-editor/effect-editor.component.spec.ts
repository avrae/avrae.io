import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectEditorComponent } from './effect-editor.component';

describe('EffectEditorComponent', () => {
  let component: EffectEditorComponent;
  let fixture: ComponentFixture<EffectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
