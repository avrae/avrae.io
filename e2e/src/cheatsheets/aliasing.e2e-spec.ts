import {browser, by, element} from 'protractor';

describe('avrae cheatsheet: aliasing', () => {

  beforeAll(() => {
    browser.get('/cheatsheets/aliasing');
  });

  it('should display a header', () => {
    expect(element(by.css('h1')).getText()).toEqual('Aliasing');
  });
});
