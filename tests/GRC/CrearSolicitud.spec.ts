import { test, expect } from '@playwright/test';
import { GRCelements } from '../../POM/GRC/GRC.elements';
import { BaseActions } from '../../POM/base/base.actions';








    test('Validar posponer instancia', async ({ page }) => {

        const BaseAction = new BaseActions(page)

   
        await BaseAction.NewInstance('Gestión Rescate de Cuotas')

        const GRCElement = new GRCelements(page)
        await GRCElement.GRCElements.ButtonComentarios.click()
        await GRCElement.GRCElements.inputComentarios.fill('prueba')
        await GRCElement.GRCElements.GuardarComentarios.click()
    
       const valueInput = await GRCElement.iframe.locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
        expect(valueInput).toContain('prueba')
    })
