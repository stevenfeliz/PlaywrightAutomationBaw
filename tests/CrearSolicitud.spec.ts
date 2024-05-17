import { test, expect } from '@playwright/test';
import { GRCPage } from '../POM/GRC/GRC.page';
import { BasePage } from '../POM/base/base.page';


test('Validar agregar comentario', async ({ page }) => {

    const BasePageInstance = new BasePage(page)
    await BasePageInstance.NewInstance('Gestión Rescate de Cuotas');


    const GRCPageInstance = new GRCPage(page)
    await GRCPageInstance.GRCElements.getButtonComentarios().click()
    await GRCPageInstance.GRCElements.getinputComentarios().fill('pruebuia')
    await GRCPageInstance.GRCElements.getGuardarComentarios().click();

    const valueInput = await GRCPageInstance.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
    expect(valueInput).toContain('prueba')
})

test('Validar consulta datos cliente con cedula', async ({ page }) => {

    // const BasePageInstance = new BasePage(page)
    // await BasePageInstance.NewInstance('Gestión Rescate de Cuotas');

    await page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal/launchTaskCompletion?taskId=44294')

    
    const GRCPageInstance = new GRCPage(page)

    await GRCPageInstance.tasksElements.crearSolicitud.getTipoIdentificacion().selectOption('Cédula')
    await GRCPageInstance.tasksElements.crearSolicitud.getNumeroIdentificacion().fill('40215782786')
    await GRCPageInstance.tasksElements.crearSolicitud.getButtonConsultar().click()
    await GRCPageInstance.iframe().locator('img[alt="Loading"]').waitFor({state:'visible',timeout:10000})
    await GRCPageInstance.iframe().locator('img[alt="Loading"]').waitFor({state:'hidden',timeout:10000})
    const valueDatoCliente = await GRCPageInstance.tasksElements.crearSolicitud.getNombreAportante().inputValue()

    expect(valueDatoCliente).toContain('JORJAN DE LA CRUZ')

})
test('prueba', async ({ page }) => {

    const BasePageInstance = new BasePage(page)
  
    await BasePageInstance.LogIn()
})