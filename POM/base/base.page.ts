import { type Locator, type Page , type FrameLocator, expect} from '@playwright/test';
import path from 'path';


export class BasePage {
    readonly page: Page;
    readonly iframe: () => FrameLocator;
    readonly generalElements: {
        getusername: () => Locator;
        getpassword:() => Locator;
        getbuttonSignIn:() => Locator;
        getLogOut:() => Locator;
        getProcessTitle: () => Locator;

    };

    constructor(page: Page) {
        this.page = page;
        
        this.iframe =()=> this.page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div iframe'),
        this.generalElements = {
            getusername: ()=> this.page.locator('input[name="identifier"]'),
            getpassword:() => this.page.locator('input[name="credentials.passcode"]'),
            getbuttonSignIn:() => this.page.locator('input[data-type="save"]'),
            getLogOut: () => this.page.locator('a[aria-label="Log Out"]'),
            getProcessTitle: () => this.iframe().locator('.title')
        };

    }

    async LogIn() {
        await this.page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal')
        await this.generalElements.getusername().fill(process.env.OKTAUSERNAME!)
        await this.generalElements.getpassword().fill(process.env.OKTAPASSWORD!)
        await this.generalElements.getbuttonSignIn().click()


        const logout = await this.generalElements.getLogOut().textContent()
        await this.page.context().storageState({ path: path.join(__dirname, '../../config/auth/auth.json') })
        expect(logout).toContain('Log Out')
        await this.page.close()
    }

    async InTask(name:string){
        const title = await this.generalElements.getProcessTitle().textContent()
        let nameSinTres = name.replace(/3$/, "").trim();
        expect(title).toContain(nameSinTres)
    }

    async NewInstance(name: string) {
        await this.page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal')
        await this.page.getByText(name).first().click()
        const title = await this.generalElements.getProcessTitle().textContent()
        let nameSinTres = name.replace(/3$/, "").trim();
        expect(title).toContain(nameSinTres)
    }


}

