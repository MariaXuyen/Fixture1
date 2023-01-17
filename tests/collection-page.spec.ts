import { CollectionPage } from "../src/page/dashboard/collection.page";
import { test, expect} from "../src/fixtures/collection.fixture"


test("test_collection", async ({ collectionPage, page, context }) => {
    await test.step("Navigate to Menu", async () => {
      await collectionPage.navigateToMenu("Products");
      await collectionPage.page.locator("//span[normalize-space()='Collections']").click();
      await page.waitForLoadState("networkidle");
    });
  
    await test.step("Add  a collection", async () => {
      await collectionPage.createCollectionButton.click();
      await collectionPage.collectionTitle.fill("Mobile Phone");
      await collectionPage.collectionType.click();
      await collectionPage.saveButton.click();
      await page.waitForLoadState("networkidle");
    });
    
    await test.step("Add product to colleciton", async () => {
      await collectionPage.addProductToCollection.click();
      await collectionPage.searchProducts.fill(
        "iPhone 14 Pro Max 128GB - XuyenPham"
      );
      await collectionPage.selectProduct.click();
      await collectionPage.saveProductButton.click();
    });
  
    const [productStorefrontPage] = await Promise.all([
      context.waitForEvent("page"),
      await collectionPage.viewProductEye.click()
    ]);
  
    const result = await productStorefrontPage
      .locator("h4 d-block product__name mt0 mb12 product__name-product")
      .textContent();
  
    // Verify title
    expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");
  
    const optionLocators = await productStorefrontPage
      .locator("//button[contains(@class, 'product__option')]")
      .all();
  
    const createdOptions = ["Space black", "Silver", "Gold", "Deep Purple"];
  
    for (let i = 0; i < optionLocators.length; i++) {
      const optionText = await optionLocators[i].textContent();
      expect(optionText).toEqual(createdOptions[i]);
    }
  });