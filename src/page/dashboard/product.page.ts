import { Locator, Page } from "@playwright/test";
import { Product } from "../types/product.type";
import { DashboardPage } from "./dashboard.page";

export class ProductPage extends DashboardPage {
  title: Locator;
  price: Locator;
  addVariantButton: Locator;
  optionName: Locator;
  optionValues: Locator;
  saveProductButton: Locator;
  viewButton: Locator;
  selectProduct: Locator;
  deleteProductButton: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.locator(
      "//input[@placeholder='Short Sleeve T-Shirt']"
    );
    this.price = this.page.locator("//input[@id='price']");
    this.addVariantButton = this.page.locator(
      "//a[normalize-space()='Add variant']"
    );
    this.optionName = this.page.locator('//input[@id="option-name"]');
    this.optionValues = this.page.locator(
      "//input[@placeholder='Separate options with comma']"
    );
    this.saveProductButton = this.page.getByText("Save changes");
    this.viewButton = this.page.locator("//span[normalize-space()='View']");

    this.selectProduct = this.page.locator(
      "//span[normalize-space()='iPhone 14 Pro Max 128GB - XuyenPham']"
    );

    this.deleteProductButton = this.page.locator(
      "//div[contains(@class,'m-r m-b-sm m-t m-l')]//div[contains(@class,'m-t')]"
    );
    this.confirmDeleteButton = this.page.locator(
      "//button[@class='s-button btn-confirm-delete is-danger']"
    );
  }

  async clickButtonAddProduct() {
    await this.page.getByText("Add product").click();
  }
  async deleteProduct() {
    await this.page.goto("https://xuyenshopbasepom.onshopbase.com/admin/products?sort_field=id&sort_mode=desc&tab=all&page=1&published_status=any")
    await this.page.waitForSelector("//span[normalize-space()='More filters']");
    await this.selectProduct.click();
    await this.deleteProductButton.click();
    await this.confirmDeleteButton.click();
  }
  



  async createProduct(product: Product){
    await this.title.fill(product.name);
    await this.price.fill(product.price + "");
    await this.addVariantButton.click();
    await this.optionName.fill(product.option.name);
    const joinedProductOptions = product.option.value.join(",");
    await this.optionValues.fill(joinedProductOptions);
    await this.saveProductButton.click();


  }
}
