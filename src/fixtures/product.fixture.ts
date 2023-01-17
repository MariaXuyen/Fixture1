import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../page/Authentication/Login.page";
import { ProductPage } from "../page/dashboard/product.page";

const test = base.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
   
    
    await loginPage.gotoAdmin();
    await page.waitForTimeout(5*1000);
    await loginPage.login();
    await page.waitForTimeout(5*1000);

    console.log("login success");
    
    await use(productPage);
    
    await productPage.deleteProduct();
    
  },
});
export {test, expect};