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
    await page.waitForTimeout(3000);
    //await expect(secureAreaPage.checkSuccessAlertIsVisible()).toBeTruthy();
    await expect(secureAreaPage.checkLogoutButtonIsVisible()).toBeTruthy();
});