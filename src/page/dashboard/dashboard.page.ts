import { Page } from "@playwright/test";

export class DashboardPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToMenu(menuName: string) {
    await this.page.click(
      `//span[@class="unite-ui-dashboard__aside--text" and normalize-space()="${menuName}"]`
    );
  }

}
