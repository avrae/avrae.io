import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthExternalComponent } from './oauth-external.component';

describe('OathExternalComponent', () => {
  let component: OauthExternalComponent;
  let fixture: ComponentFixture<OauthExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthExternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
