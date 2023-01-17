import { ProductPage } from "../src/page/dashboard/product.page";
import { Product } from "../src/page/types/product.type";
import {test, expect} from "../src/fixtures/product.fixture"


test("test_product", async ({ productPage, context  }) => {
  
  await test.step("Navigate to Menu", async () => {
    await productPage.navigateToMenu("Products");
    // await productPage.page.waitForLoadState("networkidle");
  });

  await test.step("Click button Add product", async () => {
    await productPage.clickButtonAddProduct();
    //await page.waitForLoadState();
    await productPage.page.waitForTimeout(3000);
  });

  await test.step("Input product info", async () => {
    const product: Product = {
      name: "iPhone 14 Pro Max 128GB - XuyenPham",
      price: 100,
      option: {
        name: "Colors",
        value: ["Space Black", "Silver", "Gold", "Deep Purple"],
      },
    };
    await productPage.createProduct(product);
  });

  await test.step("Verify create product", async () => {
    const [productStorefrontPage] = await Promise.all([
      context.waitForEvent("page"),
      await productPage.page.click('//i[@class="mdi mdi-eye mdi-18px d-flex"]'),
    ]);
    const result = await productStorefrontPage
      .locator("//h1[class='h4 d-block product__name mt0 mb12 product__name-product']")
      .textContent();

    // Verify title
    expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");

    const optionLocators = await productStorefrontPage
      .locator("//button[contains(@class, 'product__option')]")
      .all();

    const createdOptions = ["Space Black", "Silver", "Gold", "Deep Purple"];

    for (let i = 0; i < optionLocators.length; i++) {
      const optionText = await optionLocators[i].textContent();
      expect(optionText).toEqual(createdOptions[i]);
    }
  });
});
