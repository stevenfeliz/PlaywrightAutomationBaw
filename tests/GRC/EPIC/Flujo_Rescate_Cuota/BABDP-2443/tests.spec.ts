import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../../POM/base/base.page';


test.describe('BABDP-3008 | Quitar Opción Estado a Avanzar de la tarea "Crear Solicitud"', () => {

    // Caso de prueba

    test('Validar que no exista el campo "Estado a Avanzar desde la tarea Crear Solicitud', async ({ page }) => {
        const base = new BasePage(page)


        await test.step('Abrir instancia GRC', async () => {

            await base.NewInstance('Gestión Rescate de Cuotas')

        });

        await test.step('Validar que el elemento este oculto', async () => {

            const IframeDom = base.iframe().locator('div[data-binding="local.datosInstancia.acciones.estadoSolicitudAvanzar"]').first()

            await expect(IframeDom).toHaveCSS('display', 'none')

        });

    }); 

})

