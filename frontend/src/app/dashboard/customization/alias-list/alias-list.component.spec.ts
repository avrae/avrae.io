import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasListComponent } from './alias-list.component';

describe('AliasListComponent', () => {
  let component: AliasListComponent;
  let fixture: ComponentFixture<AliasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
