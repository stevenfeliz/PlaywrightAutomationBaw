import {type Browser, type Page, chromium } from "@playwright/test"



const authFile = "./config/auth/auth.json"

async function globalSetup() {

  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  await page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal');

  const username = 'input[name="identifier"]';
  await page.waitForSelector(username, { timeout: 10000 })
  await page.locator(username).fill('extern3884')


  const password = 'input[name="credentials.passcode"]';
  await page.waitForSelector(password, { timeout: 10000 })
  await page.locator(password).fill('Calendario2024')
  


  await page.locator('input[data-type="save"]').click();


  await page.waitForSelector('.icon-hamburger')

  await page.context().storageState({ path: authFile })

  await browser.close();

}

export default globalSetup