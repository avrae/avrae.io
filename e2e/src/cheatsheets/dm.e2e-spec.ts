import {browser, by, element} from 'protractor';

describe('avrae cheatsheet: DM Combat Guide', () => {

  beforeAll(() => {
    browser.get('/cheatsheets/dm');
  });

  it('should display a header', () => {
    expect(element(by.css('h1')).getText()).toEqual('DM Combat Guide');
  });
});
