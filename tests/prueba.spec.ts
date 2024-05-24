import { test, expect } from '@playwright/test';
import { GRCPage  } from '../POM/GRC/GRC.page';
import { BasePage } from '../POM/base/base.page';



test('prueba', async ({ page }) => {
    const GRC = new GRCPage(page)
    const base = new BasePage(page)

    await base.NewInstance('Gestión Rescate de Cuotas')
    await page.screenshot()
    // await GRC.flujoCrearSolicitud()
    // await page.pause()
})




