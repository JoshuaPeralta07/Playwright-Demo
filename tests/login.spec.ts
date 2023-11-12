import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SecureAreaPage } from '../pages/secureAreaPage';
import { Credentials } from '../config';

test('Successfully login with the correct credentials', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToPage(Credentials.url);
    await loginPage.enterCredentials(Credentials.username, Credentials.password);
    await loginPage.clickLoginButton();

    let secureAreaPage = new SecureAreaPage(page);
    await expect(await secureAreaPage.checkSuccessAlertIsVisible()).toBe(true);
    await expect(await secureAreaPage.checkLogoutButtonIsVisible()).toBe(true);
});

const errorMessage = ['Your username is invalid!', 'Your Password is invalid!'];
test('Unsuccessful login with invalid credentials', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToPage(Credentials.url);
    for(const messages in errorMessage) {
        switch(messages) {
            case 'invalid username':
                await loginPage.enterCredentials('somtmith', Credentials.password);
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBe(true);
                await expect(await loginPage.checkErrorAlert()).toBe(errorMessage[messages]);
                break;

            case 'invalid password':
                await loginPage.enterCredentials(Credentials.username, 'InvalidPass!');
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBe(true);
                await expect(await loginPage.checkErrorAlert()).toBe(errorMessage[messages]);
                break;

            default:
                await loginPage.enterCredentials('somtmith','InvalidPassw!');
                await loginPage.clickLoginButton();
                await expect(await loginPage.checkErrorAlertIsVisible()).toBe(true);
                await expect(await loginPage.checkErrorAlert()).toContain('Your username is invalid!');
                break;
        }
    }
});