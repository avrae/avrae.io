import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { OauthExternalComponent } from './oauth-external.component';
import { environment } from 'src/environments/environment';

// A well-formed JWT (header.payload.signature) whose payload decodes to a user, so
// getUser() in ngOnInit resolves instead of dereferencing a null decoded token.
function makeFakeToken(): string {
  const payload = { id: '123', username: 'testuser', discriminator: '0001', avatar: null };
  const b64url = (s: string) => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `header.${b64url(JSON.stringify(payload))}.signature`;
}

describe('OauthExternalComponent', () => {
  let component: OauthExternalComponent;
  let fixture: ComponentFixture<OauthExternalComponent>;
  const queryParams = { redirecturi: 'https://example.com' };
  const activatedRouteStub = {
    snapshot: {
      queryParamMap: convertToParamMap(queryParams)
    }
  };

  beforeEach(async () => {
    localStorage.setItem('avrae-token', makeFakeToken());

    await TestBed.configureTestingModule({
      imports: [OauthExternalComponent, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OauthExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('avrae-token');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the redirect uri from the query params', () => {
    expect(component.redirect_uri).toBe('https://example.com');
  });

  it('should check URL validity correctly', () => {
    const testUrls = ['noprotocol.com', 'ftp://invalid.com', 'invalid-url', 'https://valid.com'];

    const results = testUrls.map(url => {
      component.redirect_uri = url;
      return { url, isValid: component.isValidUrl() };
    });

    expect(results).toEqual([
      { url: 'noprotocol.com', isValid: false },
      { url: 'ftp://invalid.com', isValid: false },
      { url: 'invalid-url', isValid: false },
      { url: 'https://valid.com', isValid: true },
    ]);
  });

  it('should check URL allowance correctly', () => {
    const original = environment.allowedExternalOauths;
    environment.allowedExternalOauths = ['https://allowed.com', 'https://anotherallowed.com'];

    const testUrls = ['https://allowed.com', 'https://notallowed.com', 'https://anotherallowed.com'];

    const results = testUrls.map(url => {
      component.redirect_uri = url;
      return { url, isAllowed: component.isAllowedUrl() };
    });

    environment.allowedExternalOauths = original;

    expect(results).toEqual([
      { url: 'https://allowed.com', isAllowed: true },
      { url: 'https://notallowed.com', isAllowed: false },
      { url: 'https://anotherallowed.com', isAllowed: true },
    ]);
  });
});
