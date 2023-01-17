import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export class CollectionPage extends DashboardPage {
  createCollectionButton: Locator;
  collectionTitle: Locator;
  collectionType: Locator;
  saveButton: Locator;
  addProductToCollection: Locator;
  searchProducts: Locator;
  selectProduct: Locator;
  saveProductButton: Locator;
  viewProductEye: Locator;
  selectCollection: Locator;
  deleteCollectionButton: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createCollectionButton = this.page.locator(
      "//span[normalize-space()='Create collection']"
    );
    this.collectionTitle = this.page.locator(
      "//input[@placeholder='e.g Summer collection, Under $100, Staff picks']"
    );
    this.collectionTitle = this.page.locator(
      "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
    );
    this.collectionType = this.page.locator(
      "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
    );
    this.saveButton = this.page.locator("//span[normalize-space()='Save']");
    this.addProductToCollection = this.page.locator(
      "//button[normalize-space()='Add product']"
    );
    this.searchProducts = this.page.locator(
      "//input[@placeholder='Search for product']"
    );
    this.selectProduct = this.page.locator(
      "//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]"
    );
    this.saveProductButton = this.page.locator(
      "//div[@class='s-modal-footer']//span[@class='s-flex s-flex--align-center'][normalize-space()='Save']"
    );
    this.viewProductEye = this.page.locator(
      "//i[@class='mdi mdi-eye mdi-18px d-flex']"
    );
    // this.selectCollection.locator()

    this.selectCollection = this.page.locator(
      "//input[@placeholder='e.g Summer collection, Under $100, Staff picks']"
    );
    this.deleteCollectionButton = this.page.locator(
      "//button[@class='s-button is-danger']//normalize-space()='Delete']"
    );
    this.confirmDeleteButton = this.page.locator(
      "//div[@class='s-modal-footer']//span[@class='s-flex s-flex--align-center'][normalize-space()='Delete']"
    );
  }

  async createCollection() {
    await this.createCollectionButton.click();
    await this.collectionTitle.fill("Mobile Phone");
    await this.collectionType.click();
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async deleteCollection() {
    await this.page.goto(
      "https://xuyenshopbasepom.onshopbase.com/admin/collections?sort_field=id&sort_mode=desc&tab=all&page=1&published_status=any"
    );
    await this.selectCollection.click();
    await this.deleteCollectionButton.click();
    await this.confirmDeleteButton.click();
  }
}
