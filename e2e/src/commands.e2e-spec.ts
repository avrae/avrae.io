import {browser, by, element} from 'protractor';

describe('avrae commands page', () => {
  let renderedModules;

  beforeAll(() => {
    browser.get('/commands');
    renderedModules = element.all(by.css('.module-container'));
  });

  it('should display a header', () => {
    expect(element(by.css('h1')).getText()).toEqual('Avrae Commands');
  });

  it('should show some modules', () => {
    expect(renderedModules.count()).toBeGreaterThan(0);
  });

  it('should show some commands in each module', () => {
    renderedModules.each(moduleElement => {
      const moduleCommands = moduleElement.all(by.tagName('avr-command-display'));
      expect(moduleCommands.count()).toBeGreaterThan(0);
    });
  });
});
