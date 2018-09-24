import { HomebrewModule } from './homebrew.module';

describe('HomebrewModule', () => {
  let homebrewModule: HomebrewModule;

  beforeEach(() => {
    homebrewModule = new HomebrewModule();
  });

  it('should create an instance', () => {
    expect(homebrewModule).toBeTruthy();
  });
});
