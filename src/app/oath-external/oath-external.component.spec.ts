import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OathExternalComponent } from './oath-external.component';

describe('OathExternalComponent', () => {
  let component: OathExternalComponent;
  let fixture: ComponentFixture<OathExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OathExternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OathExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
