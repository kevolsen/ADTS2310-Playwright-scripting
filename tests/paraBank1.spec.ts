import { test, expect } from '@playwright/test';

test.describe('testCustomerCare', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/contact.htm'); 
    })

    test('Test with all fields filled', async ({ page }) => {
        await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.');
        await page.locator('#name').fill('John Doe');
        await page.locator('#email').fill('JohnDoe@email.com');
        await page.locator('#phone').fill('999 99 999');
        await page.locator('#message').fill('Message test.');
        await page.getByRole('button', { name: 'Send to Customer Care' }).click();
        await expect(page.locator('#rightPanel')).toContainText('Thank you John Doe');
        await page.waitForTimeout(3000);
    })

    test('Name missing', async ({ page }) => {
        await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.');
        await page.locator('#name').fill('');
        await page.locator('#email').fill('JohnDoe@email.com');
        await page.locator('#phone').fill('999 99 999');
        await page.locator('#message').fill('Message test.');
        await page.getByRole('button', { name: 'Send to Customer Care' }).click();
        await expect(page.locator('[id="name\\.errors"]')).toContainText('Name is required.');
    })

    test('Email missing', async ({ page }) => {
        await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.');
        await page.locator('#name').fill('John Doe');
        await page.locator('#email').fill('');
        await page.locator('#phone').fill('999 99 999');
        await page.locator('#message').fill('Message test.');
        await page.getByRole('button', { name: 'Send to Customer Care' }).click();
        await expect(page.locator('[id="email\\.errors"]')).toContainText('Email is required.');
    })

    test('Phone no. missing', async ({ page }) => {
        await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.');
        await page.locator('#name').fill('John Doe');
        await page.locator('#email').fill('JohnDoe@email.com');
        await page.locator('#phone').fill('');
        await page.locator('#message').fill('Message test.');
        await page.getByRole('button', { name: 'Send to Customer Care' }).click();
        await expect(page.locator('[id="phone\\.errors"]')).toContainText('Phone is required.');
    })

    test('Message missing', async ({ page }) => {
        await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.');
        await page.locator('#name').fill('John Doe');
        await page.locator('#email').fill('JohnDoe@email.com');
        await page.locator('#phone').fill('999 99 999');
        await page.locator('#message').fill('');
        await page.getByRole('button', { name: 'Send to Customer Care' }).click();
        await expect(page.locator('[id="message\\.errors"]')).toContainText('Message is required.');
    })

})