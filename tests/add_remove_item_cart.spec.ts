import { test, expect } from '@playwright/test';

test('add_remove_item_cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();


  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $31.00');
  await page.locator('[data-test="checkout"]').hover();
  await expect(page.getByText('Cappuccino x 1+-Espresso Macchiato x 1+-Total: $')).toBeVisible();

  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(page.getByText('Cappuccino x 2+-')).toBeVisible();

  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await expect(page.getByText('Espresso Macchiato x 2+-')).toBeVisible();

  await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();
  await expect(page.getByText('Cappuccino x 1+-')).toBeVisible();

  await page.getByRole('button', { name: 'Remove one Espresso Macchiato' }).click();
  await expect(page.getByText('Espresso Macchiato x 1+-')).toBeVisible();

  await expect(page.locator('#app')).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - text: Cappuccino x 1
        - button "Add one Cappuccino": +
        - button "Remove one Cappuccino": "-"
      - listitem:
        - text: Espresso Macchiato x 1
        - button "Add one Espresso Macchiato": +
        - button "Remove one Espresso Macchiato": "-"
    `);
});