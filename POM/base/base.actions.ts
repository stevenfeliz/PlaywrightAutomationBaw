import { type Page, expect } from '@playwright/test';
import { BaseElements } from './base.elements';
import path from 'path';



export class BaseActions {
    readonly page: Page;
    readonly baseElements: BaseElements;


    constructor(page: Page) {
        this.baseElements = new BaseElements(page);
        this.page = page
    }

    async LogIn() {
        await this.page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal')
        await this.baseElements.generalElements.username.fill('extern3884')
        await this.baseElements.generalElements.password.fill('Calendario2024')
        await this.baseElements.generalElements.buttonSignIn.click()
        await this.baseElements.generalElements.BawHamburgerIcon.waitFor({ timeout: 90000 })
        await this.page.context().storageState({ path: path.join(__dirname, '../../config/auth/auth.json') })
        expect(this.baseElements.generalElements.BawHamburgerIcon).toBeVisible({ timeout: 10000 })
        await this.page.close()
    }

    async NewInstance(name: string) {
        await this.page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal')
        await this.page.locator(`a[aria-label="${name}"]`).click()
        const title = await this.baseElements.generalElements.ProcessTitle.textContent()
        expect(title).toContain(name)
    }



}