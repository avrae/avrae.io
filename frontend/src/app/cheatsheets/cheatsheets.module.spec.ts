import { CheatsheetsModule } from './cheatsheets.module';

describe('CheatsheetsModule', () => {
  let cheatsheetsModule: CheatsheetsModule;

  beforeEach(() => {
    cheatsheetsModule = new CheatsheetsModule();
  });

  it('should create an instance', () => {
    expect(cheatsheetsModule).toBeTruthy();
  });
});
