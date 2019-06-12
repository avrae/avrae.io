import {HomebrewSharingModule} from './homebrew-sharing.module';

describe('HomebrewSharingModule', () => {
  let homebrewSharingModule: HomebrewSharingModule;

  beforeEach(() => {
    homebrewSharingModule = new HomebrewSharingModule();
  });

  it('should create an instance', () => {
    expect(homebrewSharingModule).toBeTruthy();
  });
});
