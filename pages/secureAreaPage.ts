import { Page, Locator } from "@playwright/test";

export class SecureAreaPage {
    readonly page : Page;
    readonly successAlert : Locator;
    readonly logoutButton : Locator;

    constructor(page : Page) {
        this.page = page;
        this.successAlert = this.page.locator('id="flash"');
        this.logoutButton = this.page.locator('//i[@class="icon-2x icon-signout"]');
    }

    async checkSuccessAlertIsVisible(): Promise<boolean> {
        return await this.successAlert.isVisible();
    }

    async checkLogoutButtonIsVisible(): Promise<boolean> {
        return await this.logoutButton.isVisible();
    }
}