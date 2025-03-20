import { test, expect } from '@playwright/test';

test.describe('test account', async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await page.getByRole('link', { name: 'Admin Page' }).click();
        await page.getByRole('button', { name: 'Initialize' }).click();
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('[id="customer\\.firstName"]').fill('John');
        await page.locator('[id="customer\\.lastName"]').fill('Doe');
        await page.locator('[id="customer\\.address\\.street"]').fill('Main St. 322');
        await page.locator('[id="customer\\.address\\.city"]').fill('Beverly Hills');
        await page.locator('[id="customer\\.address\\.state"]').fill('CA');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('90210');
        await page.locator('[id="customer\\.phoneNumber"]').fill('99999999');
        await page.locator('[id="customer\\.ssn"]').fill('12345612345');
        await page.locator('[id="customer\\.username"]').fill('JohnDoe7');
        await page.locator('[id="customer\\.password"]').fill('JohnDoe123');
        await page.locator('#repeatedPassword').fill('JohnDoe123');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
        await page.getByRole('link', { name: 'Log Out' }).click();
        await expect(page.locator('h2')).toContainText('Customer Login');

        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page.locator('h2')).toContainText('Customer Login');
        await page.locator('input[name="username"]').fill('JohnDoe7');
        await page.locator('input[name="password"]').fill('JohnDoe123');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.locator('#leftPanel')).toContainText('Account Services');
    })

    test.afterEach(async ({ page }) => {
        await page.getByRole('link', { name: 'Log Out' }).click();
        await expect(page.locator('h2')).toContainText('Customer Login');
    })

    test('Update contact info', async ({ page }) => {
        await page.getByRole('link', { name: 'Update Contact Info' }).click();
        await expect(page.locator('#updateProfileForm')).toContainText('Update Profile');
        await expect(page.locator('[id="customer\\.address\\.zipCode"]')).toHaveValue('90210');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.locator('#zipCode-error')).toContainText('Zip Code is required.');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('90210');
        await page.locator('[id="customer\\.firstName"]').fill('Johnny');
        await page.locator('[id="customer\\.phoneNumber"]').fill('11111111');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.locator('#updateProfileResult')).toContainText('Profile Updated');
        await page.getByRole('link', { name: 'Update Contact Info' }).click();
        await expect(page.locator('[id="customer\\.phoneNumber"]')).toHaveValue('11111111');
        await expect(page.locator('[id="customer\\.firstName"]')).toHaveValue('Johnny');
    })

    test('Request loan', async ({ page }) => {
        await page.getByRole('link', { name: 'Request Loan' }).click();
        await expect(page.locator('#requestLoanForm')).toContainText('Apply for a Loan');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.locator('#requestLoanError')).toContainText('An internal error has occurred and has been logged.');

        await page.getByRole('link', { name: 'Request Loan' }).click();
        await page.locator('#amount').click();
        await page.locator('#amount').fill('100');
        await page.locator('#downPayment').click();
        await page.locator('#downPayment').fill('50');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.locator('#loanRequestApproved')).toContainText('Congratulations, your loan has been approved.');
        await page.locator('a[href^="/parabank/activity.htm?id="]').click();
        await expect(page.locator('#balance')).toContainText('$100.00');

        await page.getByRole('link', { name: 'Request Loan' }).click();
        await page.locator('#amount').fill('100000000');
        await page.locator('#downPayment').fill('10');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.locator('#loanRequestDenied')).toContainText('We cannot grant a loan in that amount with your available funds.');
    })

    test.only('Pay bill', async ({ page }) => {
        await page.getByRole('link', { name: 'Bill Pay' }).click();
        await page.getByRole('button', { name: 'Send Payment' }).click();
        await expect(page.locator('#validationModel-name')).toContainText('Payee name is required.');
        await page.locator('input[name="payee\\.accountNumber"]').click();
        await page.locator('input[name="payee\\.accountNumber"]').fill('test');
        await page.locator('input[name="verifyAccount"]').fill('test');
        await page.getByRole('button', { name: 'Send Payment' }).click();
        await expect(page.getByRole('rowgroup')).toContainText('Account number is required. Please enter a valid number.');

        await page.getByRole('link', { name: 'Bill Pay' }).click();
        await page.locator('input[name="payee\\.name"]').fill('Jane Doe');
        await page.locator('input[name="payee\\.address\\.street"]').fill('Main St. 106');
        await page.locator('input[name="payee\\.address\\.city"]').fill('Beverly Hills');
        await page.locator('input[name="payee\\.address\\.state"]').fill('CA');
        await page.locator('input[name="payee\\.address\\.zipCode"]').fill('90210');
        await page.locator('input[name="payee\\.phoneNumber"]').fill('12345678');
        await page.locator('input[name="payee\\.accountNumber"]').fill('13767');
        await page.locator('input[name="verifyAccount"]').fill('13767');
        await page.locator('input[name="amount"]').fill('100');
        await page.getByRole('button', { name: 'Send Payment' }).click();
        await expect(page.locator('#billpayResult')).toContainText('Bill Payment Complete');
        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await page.locator('a[href^="activity.htm?id="]').click();
        await page.waitForTimeout(1000);
    })

})