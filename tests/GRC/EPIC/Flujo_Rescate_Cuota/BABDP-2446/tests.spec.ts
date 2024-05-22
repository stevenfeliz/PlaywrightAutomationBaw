
import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../../POM/base/base.page';
import { GRCPage } from '../../../../../POM/GRC/GRC.page';
import { TkIdByName } from '../../../../../utils/processInspector/TkIdByName'
import { AsignarTask } from '../../../../../utils/asignarTask';


test.describe('BABDP-2446 | Yo como usuario del proceso necesito tener un historial de ejecución de la solicitud', () => {

    // positivos
    test('Validar que se guarda el historial al pasar por la tarea Crear Solicitud', async ({ page }) => {

        const BASE = new BasePage(page)
        const GRC = new GRCPage(page)
        let instanceID;
        let TaskId;

        await test.step('Abrir Instancia GRC', async () => {

            await BASE.NewInstance('Gestión Rescate de Cuotas')
        })

        await test.step('completar flujo tarea Crear Solicitud', async () => {
            instanceID = await GRC.flujoCrearSolicitud()
        })
        await test.step('Avanzar Crear Solicitud', async () => {
            await GRC.GRCElements.getIdInstancia().waitFor({ state: 'visible' })
            await GRC.GRCElements.getAvanzar().click()

            await GRC.GRCElements.getIdInstancia().waitFor({ state: 'hidden' })


            TaskId = await TkIdByName(instanceID, 'Validar Disponibilidad')

            console.log(await TaskId)
            await AsignarTask(instanceID, 'Validar Disponibilidad')

        })
        await test.step('Abrir tarea "Validar Disponibilidad"', async () => {
            await page.goto(`https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal/launchTaskCompletion?taskId=${TaskId}`)
            await BASE.InTask('Gestión Rescate de Cuotas')
            await GRC.GRCElements.getHistorialEjecucion().click()
            
            let usuario = await GRC.iframe().locator('.outerTable table tbody tr p').nth(1).textContent()
            let tarea = await GRC.iframe().locator('.outerTable table tbody tr p').nth(2).textContent()

            expect(usuario).toContain('EXTERN3884@bpd.com.do')
            expect(tarea).toContain('Crear Solicitud')

            await page.pause();
        })


    });


})