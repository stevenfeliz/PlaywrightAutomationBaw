import { test, expect } from '@playwright/test';
import { BaseActions } from '../../../POM/base/base.actions';
import { GRCelements } from '../../../POM/GRC/GRC.elements';


test.describe('GRC | Regresion | Validar Relacionado',()=>{



    test('Validar posponer instancia', async({page})=>{

        const BaseAction = new BaseActions(page)
        await BaseAction.NewInstance('Gestión Rescate de Cuotas 3')

    //     const GRCElement = new GRCelements(page)

    //    await GRCElement.GRCElements.ButtonComentarios.click()
    //    await GRCElement.GRCElements.inputComentarios.fill('prueba')
    //    await GRCElement.GRCElements.GuardarComentarios.click()
    //    await GRCElement.GRCElements.RegresarComentarios.click()
    //    await GRCElement.GRCElements.ButtonComentarios.click()
    //   const Cantidadcomentario = await GRCElement.iframe.locator('//*[@class="outerTable"]//tbody').innerHTML()
  
    //   await page.pause()
      
        
    //     console.log(Cantidadcomentario)
       


    })
})