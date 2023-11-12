import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SecureAreaPage } from '../pages/secureAreaPage';

test('Successfully login with the correct credentials', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToPage('https://the-internet.herokuapp.com/login');
    await loginPage.enterUsername('tomsmith');
    await loginPage.enterPassword('SuperSecretPassword!');
    await loginPage.clickLoginButton();

    let secureAreaPage = new SecureAreaPage(page);
    await expect(await secureAreaPage.checkSuccessAlertIsVisible()).toBe(true);
    await expect(await secureAreaPage.checkLogoutButtonIsVisible()).toBe(true);
});

const errorMessage = ['Your username is invalid!', 'Your Password is invalid!'];
test('Unsuccessful login with invalid credentials', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToPage('https://the-internet.herokuapp.com/login');
    for(const messages in errorMessage) {
        switch(messages) {
            case 'invalid username':
                await loginPage.enterUsername('somtmith');
                await loginPage.enterPassword('SuperSecretPassword!');
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBeTruthy();
                await expect(await loginPage.checkErrorAlert()).toContain(errorMessage[messages]);
                break;

            case 'invalid password':
                await loginPage.enterUsername('tomsmith');
                await loginPage.enterPassword('InvalidPassword!');
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBeTruthy();
                await expect(await loginPage.checkErrorAlert()).toContain(errorMessage[messages]);
                break;

            default:
                await loginPage.enterUsername('somtmith');
                await loginPage.enterPassword('InvalidPAssword!');
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBeTruthy();
                await expect(await loginPage.checkErrorAlert()).toContain('Your username is invalid!');
                break;
        }
    }
});