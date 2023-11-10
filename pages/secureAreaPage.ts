import { Page, Locator } from "@playwright/test";

export class SecureAreaPage {
    readonly page : Page;
    readonly successAlert : Locator;
    readonly logoutButton : Locator;

    constructor(page : Page) {
        this.page = page;
        this.successAlert = this.page.locator('#flash');
        this.logoutButton = this.page.locator("//i[contains(text(), 'Logout')]");
    }

    async checkSuccessAlertIsVisible(): Promise<boolean> {
        await this.successAlert.waitFor({ state: 'visible' })
        return await this.successAlert.isVisible();
    }

    async checkLogoutButtonIsVisible(): Promise<boolean> {
        await this.logoutButton.waitFor({ state: 'visible' });
        return await this.logoutButton.isVisible();
    }
}