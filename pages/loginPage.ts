import { Page, Locator} from "@playwright/test";

export class LoginPage {
    readonly page : Page;
    readonly usernameField : Locator;
    readonly passwordField : Locator;
    readonly loginButton : Locator;

    constructor(page : Page) {
        this.page = page;
        this.usernameField = this.page.locator("input[name='username']");
        this.passwordField = this.page.locator("input[name='password']");
        this.loginButton = this.page.locator("button[type='submit']");
    }

    async navigateToPage(url : string) {
        await this.page.goto(url);
    }

    async enterUsername(username : string) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password : string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}