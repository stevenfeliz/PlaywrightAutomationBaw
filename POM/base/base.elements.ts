import { type Locator, type Page , type FrameLocator} from '@playwright/test';


export class BaseElements {
    readonly page: Page;
    readonly generalElements: {
        username: Locator;
        password: Locator;
        buttonSignIn: Locator;
        BawHamburgerIcon: Locator;
        iframe: FrameLocator;
        ProcessTitle: Locator;

    };

    constructor(page: Page) {
        this.generalElements = {
            username: page.locator('input[name="identifier"]'),
            password: page.locator('input[name="credentials.passcode"]'),
            buttonSignIn: page.locator('input[data-type="save"]'),
            BawHamburgerIcon: page.locator('.icon-hamburger'),
            iframe: page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div iframe'),
            ProcessTitle: page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div iframe').locator('.title')
        };

    }

}

