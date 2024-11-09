import { test, expect } from '@playwright/test';
import { GRCPage  } from '../POM/GRC/GRC.page';
import { BasePage } from '../POM/base/base.page';
import { AsignarTask } from '../utils/asignarTask';



test('login', async ({ page }) => {
    const GRC = new GRCPage(page)
    const base = new BasePage(page)

   await AsignarTask(12441,'Debida Diligencia')
   
    // await GRC.flujoCrearSolicitud()
    // await page.pause()
})




