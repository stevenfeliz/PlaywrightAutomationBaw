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
        await this.baseElements.generalElements.username.fill(process.env.OKTAUSERNAME!)
        await this.baseElements.generalElements.password.fill(process.env.OKTAPASSWORD!)
        await this.baseElements.generalElements.buttonSignIn.click()
        await this.baseElements.generalElements.BawHamburgerIcon.waitFor({ timeout: 90000 })
        await this.page.context().storageState({ path: path.join(__dirname, '../../config/auth/auth.json') })
        expect(this.baseElements.generalElements.BawHamburgerIcon).toBeVisible({ timeout: 10000 })
        await this.page.close()
    }

    async NewInstance(name: string) {
        await this.page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal')
        await this.page.getByText(name).first().click()
        const title = await this.baseElements.generalElements.ProcessTitle.textContent()
        let nameSinTres = name.replace(/3$/, "").trim();
        expect(title).toContain(nameSinTres)
    }



}