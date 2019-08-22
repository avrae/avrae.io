import {browser, by, element} from 'protractor';

describe('avrae commands page', () => {
  let sidenavButtons;
  let renderedModules;

  beforeAll(() => {
    browser.get('/commands');
    sidenavButtons = element.all(by.css('a.mat-list-item'));
    renderedModules = element.all(by.css('mat-card.container'));
  });

  it('should display a header', () => {
    expect(element(by.css('h1')).getText()).toEqual('Command List');
  });

  it('should populate the sidebar', () => {
    expect(sidenavButtons.count()).toBeGreaterThan(0);
  });

  it('should show some modules', () => {
    expect(renderedModules.count()).toBeGreaterThan(0);
  });

  it('should have the same number of rendered modules and sidebar navs', () => {
    expect(renderedModules.count()).toEqual(sidenavButtons.count());
  });

  it('should show some commands in each module', () => {
    renderedModules.each(moduleElement => {
      const moduleCommands = moduleElement.all(by.css('mat-expansion-panel'));
      expect(moduleCommands.count()).toBeGreaterThan(0);
    });
  });
});
