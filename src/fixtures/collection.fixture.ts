import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../page/Authentication/Login.page";
import { CollectionPage } from "../page/dashboard/collection.page";

const test = base.extend<{ collectionPage: CollectionPage }>({
  collectionPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const collectionPage = new CollectionPage(page);

    await loginPage.gotoAdmin();
    await page.waitForTimeout(5 * 1000);
    await loginPage.login();
    await page.waitForTimeout(5 * 1000);

    console.log("login success");

    await use(collectionPage);

    await collectionPage.deleteCollection();
  },
});
export { test, expect };
