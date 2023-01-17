import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../page/Authentication/Login.page";
import { ProductPage } from "../page/dashboard/product.page";
import { DiscountPage } from "../page/dashboard/discount.page";

const test = base.extend<{ discountPage: DiscountPage }>({
  discountPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const discountPage = new DiscountPage(page);

    await loginPage.gotoAdmin();
    await page.waitForTimeout(5 * 1000);
    await loginPage.login();
    await page.waitForTimeout(5 * 1000);

    console.log("login success");

    await use(discountPage);

    await discountPage.deleteDiscount();
  },
});
export { test, expect };
