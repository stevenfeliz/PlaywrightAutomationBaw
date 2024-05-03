import {type Browser, type Page, chromium } from "@playwright/test"



const authFile = "./config/auth/auth.json"

async function globalSetup() {

  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  await page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal');

  await page.getByLabel('Nombre de usuario').fill('extern3884');

  await page.getByLabel('Contraseña').fill('Calendario2024');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();


  await page.waitForSelector('.icon-hamburger')

  await page.context().storageState({ path: authFile })

  await browser.close();

}

export default globalSetup