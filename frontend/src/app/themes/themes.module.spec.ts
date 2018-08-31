import { ThemesModule } from './themes.module';

describe('ThemesModule', () => {
  let themesModule: ThemesModule;

  beforeEach(() => {
    themesModule = new ThemesModule();
  });

  it('should create an instance', () => {
    expect(themesModule).toBeTruthy();
  });
});
