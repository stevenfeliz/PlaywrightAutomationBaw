import {type Browser, type Page, chromium } from "@playwright/test"
import { BaseActions } from "../POM/base/base.actions"



async function globalSetup() {

  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  const BaseAction = new BaseActions(page)
  
  await BaseAction.LogIn()

}

export default globalSetup