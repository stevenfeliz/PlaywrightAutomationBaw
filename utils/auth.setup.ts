import {type Browser, type Page, chromium } from "@playwright/test"
import {BasePage} from '../POM/base/base.page'



async function globalSetup() {

  const browser: Browser = await chromium.launch({headless:false})
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  const BasePageInstance = new BasePage(page)
  
  await BasePageInstance.LogIn()

}

export default globalSetup