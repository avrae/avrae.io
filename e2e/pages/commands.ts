import { Page } from "@playwright/test";

export class CommandsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/commands");
  }

  async getHeaderText() {
    return this.page.textContent("h1");
  }

  async getRenderedModules() {
    return this.page.locator("css=.module-container");
  }

  async getModuleCommands(moduleElement) {
    return moduleElement.locator("css=avr-command-display");
  }
}
