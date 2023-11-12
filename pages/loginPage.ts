import { Page, Locator} from "@playwright/test";

const message = ['Your username is invalid!', 'Your Password is invalid']
export class LoginPage {
    readonly page : Page;
    readonly usernameField : Locator;
    readonly passwordField : Locator;
    readonly loginButton : Locator;
    readonly errorAlert : Locator;


    constructor(page : Page) {
        this.page = page;
        this.usernameField = this.page.locator("input[name='username']");
        this.passwordField = this.page.locator("input[name='password']");
        this.loginButton = this.page.locator("button[type='submit']");
        this.errorAlert = this.page.locator("#flash");
    }

    async navigateToPage(url : string) {
        await this.page.goto(url);
    }

    async enterCredentials(username : string, password : string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async checkErrorAlertIsVisible(): Promise<boolean> {
        await this.errorAlert.waitFor({ state: 'visible' });
        return await this.errorAlert.isVisible();
    }

    async checkErrorAlert(): Promise<string> {
        return await this.errorAlert.innerText();
    }
}