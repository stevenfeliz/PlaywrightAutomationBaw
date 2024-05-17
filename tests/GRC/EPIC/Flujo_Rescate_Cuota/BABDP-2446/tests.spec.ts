
import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../../POM/base/base.page';
import { GRCPage } from '../../../../../POM/GRC/GRC.page';
import {TkIdByName} from '../../../../../utils/processInspector/TkIdByName'
import { AsignarTask } from '../../../../../utils/asignarTask';
test.describe('BABDP-2446 | Yo como usuario del proceso necesito tener un historial de ejecución de la solicitud', () => {

    // positivos
    test('Validar flujo', async ({ page }) => {

        const BASE = new BasePage(page)
        const GRC = new GRCPage(page)
        let instanceID;
        let TaskId;

        await test.step('Abrir Instancia GRC', async () => {
        
            await BASE.NewInstance('Gestión Rescate de Cuotas')
        })

        await test.step('Avanzar desde la tarea Crear Solicitud', async () => {
            instanceID = await GRC.flujoCrearSolicitud()
        })
        await test.step('Avanzar Crear Solicitud', async () => {
            await GRC.GRCElements.getIdInstancia().waitFor({state:'visible'})
            await GRC.GRCElements.getAvanzar().click()
 
            await GRC.GRCElements.getIdInstancia().waitFor({state:'hidden'})


            if(instanceID !== undefined && instanceID !== 0){
                await page.waitForTimeout(5000)
                 TaskId = await TkIdByName(instanceID,'Validar Disponibilidad')
            } 

            console.log(await TaskId)
            await AsignarTask(instanceID,'Validar Disponibilidad')
           
         })
         await test.step('Abrir tarea "Validar Disponibilidad"', async () => {
            await page.goto(`https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal/launchTaskCompletion?taskId=${TaskId}`)
            await BASE.InTask('Gestión Rescate de Cuotas')
           await page.pause();
         })

      
    });


})