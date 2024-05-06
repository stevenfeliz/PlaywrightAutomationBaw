import { type Locator, type Page , type FrameLocator} from '@playwright/test';


export class GRCelements {
    readonly page: Page;
    readonly iframe:FrameLocator;
    readonly GRCElements: {
        ButtonComentarios: Locator,
        inputComentarios: Locator,
        GuardarComentarios: Locator,
        RegresarComentarios: Locator,
    };

    constructor(page: Page) {
        this.iframe = page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div iframe'),
        this.GRCElements = {
            ButtonComentarios: this.iframe.locator('button[id="button-button-CV_Generales1:Button2"]'),
            inputComentarios: this.iframe.locator('textarea[id="textarea-textarea-Text_area1"]'),
            GuardarComentarios: this.iframe.locator('button[id="button-button-Button1"]'),
            RegresarComentarios: this.iframe.locator('button[id="button-button-Button2"]'),
        };

    }

}

