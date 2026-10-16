import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OauthExternalComponent } from './oauth-external.component';
import { environment } from 'src/environments/environment';

describe('OauthExternalComponent', () => {
  let component: OauthExternalComponent;
  let fixture: ComponentFixture<OauthExternalComponent>;
  const routeParams = { provider: 'test-provider' };
  const activatedRouteStub = {
    params: of(routeParams),
    snapshot: {
      params: routeParams,
      paramMap: convertToParamMap(routeParams)
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthExternalComponent, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OauthExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide the route parameter', () => {
    const route = TestBed.inject(ActivatedRoute);

    expect(route.snapshot.paramMap.get('provider')).toBe('test-provider');
  });

  it('should check URL validity correctly', () => {
    const testUrls = [
      'noprotocol.com',
      'ftp://invalid.com',
      'invalid-url',
      'https://valid.com',
      'https://valid.com',
    ]

    let results = []

    for (const url of testUrls) {
      component.redirect_uri = url;
      const isValid = component.isValidUrl();
      results.push({ url, isValid });
    }

    expect(results).toEqual([
      { url: 'noprotocol.com', isValid: false },
      { url: 'ftp://invalid.com', isValid: false },
      { url: 'invalid-url', isValid: false },
      { url: 'https://valid.com', isValid: true },
      { url: 'https://valid.com', isValid: true },
    ]);
  })

  it('should check URL allowance correctly', () => {
    let allowedDomains = ['https://allowed.com', 'https://anotherallowed.com'];
    const toRestore = environment.allowedExternalOauths = allowedDomains;
    environment.allowedExternalOauths = allowedDomains;

    const testUrls = [
      'https://allowed.com',
      'https://notallowed.com',
      'https://anotherallowed.com',
    ];

    let results = [];

    for (const url of testUrls) {
      component.redirect_uri = url;
      const isAllowed = component.isAllowedUrl();
      results.push({ url, isAllowed });
    }

    environment.allowedExternalOauths = toRestore;
    expect(results).toEqual([
      { url: 'https://allowed.com', isAllowed: true },
      { url: 'https://notallowed.com', isAllowed: false },
      { url: 'https://anotherallowed.com', isAllowed: true },
    ]);
  })
});
