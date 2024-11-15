import { test, expect } from "@playwright/test";
import { CommandsPage } from "./pages/commands";

test.describe("avrae commands page", () => {
  let commandsPage: CommandsPage;

  test.beforeEach(async ({ page }) => {
    commandsPage = new CommandsPage(page);
    await commandsPage.navigate();
  });

  test("should display a header", async () => {
    const headerText = await commandsPage.getHeaderText();
    expect(headerText).toEqual("Avrae Commands");
  });

  test("should show some modules", async () => {
    const renderedModules = await commandsPage.getRenderedModules();
    for (const moduleElement of await renderedModules.all()) {
      expect(moduleElement);
    }
  });

  test("should show some commands in each module", async () => {
    const renderedModules = await commandsPage.getRenderedModules();
    for (const moduleElement of await renderedModules.all()) {
      const moduleCommands = await commandsPage.getModuleCommands(
        moduleElement
      );
      for (const commandElement of await moduleCommands.all()) {
        expect(commandElement).toBeVisible();
      }
    }
  });
});
