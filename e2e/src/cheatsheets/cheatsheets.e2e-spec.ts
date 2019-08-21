import {browser, by, element} from 'protractor';

describe('avrae cheatsheets home', () => {

  beforeAll(() => {
    browser.get('/cheatsheets');
  });

  it('should display a header', () => {
    expect(element(by.css('h1')).getText()).toEqual('Cheatsheets');
  });

  it('should show some cheatsheets', () => {
    const cheatsheets = element.all(by.css('mat-card.cheatsheet'));
    expect(cheatsheets.count()).toBeGreaterThan(0);
  });
});
