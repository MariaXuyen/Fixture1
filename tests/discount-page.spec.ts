import { DiscountPage } from "../src/page/dashboard/discount.page";
import {test, expect} from "../src/fixtures/discount.fixture"

import { CheckoutPage } from "../src/page/dashboard/checkout.page";

test ("test_discount", async ({ discountPage, page}) => {
    const checkoutPage = new CheckoutPage(page);
  
    await test.step("Navigate to Menu", async () => {
      await discountPage.navigateToMenu("Discounts");
      // await page.waitForLoadState("networkidle");
    });
  
    await test.step("Fill discount info", async () => {
      await discountPage.fillDiscountCode();
    });
    await test.step("Check out", async () => {
      await checkoutPage.checkout();
    });
  
  
})