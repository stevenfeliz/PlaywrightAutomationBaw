import { test, expect } from '@playwright/test';
import { GRCPage  } from '../POM/GRC/GRC.page';
import { BasePage } from '../POM/base/base.page';
import { AsignarTask } from '../utils/asignarTask';



test('tespruebaa', async ({ page }) => {
    const BASE = new BasePage(page)

   
  await test.step('Dado que estoy en recibir factura', async () => {
    await page.goto("https://www.google.com/");
  })



})



