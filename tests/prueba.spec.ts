import { test, expect } from '@playwright/test';



test.describe('valida prueba mmg', () => {

  test('TC1', async ({ page }) => {
  
     
    await test.step('Dado que estoy en recibir factura', async () => {
      await page.goto("https://www.google.com/");
      await page.screenshot()
    })
  
  })
  test('TC2', async ({ page }) => {
  
     
    await test.step('Dado que estoy en recibir factura', async () => {
      await page.goto("https://www.google.com/");
      await page.screenshot()
    })
  
  })

  test('TC3', async ({ page }) => {
  
     
    await test.step('Dado que estoy en recibir factura', async () => {
      await page.goto("https://www.google.com/");
      await page.screenshot()
    })
  
  })



})



