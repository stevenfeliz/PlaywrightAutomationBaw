
import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../../POM/base/base.page';
import { GRCPage } from '../../../../../POM/GRC/GRC.page';

test.describe('BABDP-2681 | Integración con cedulados/RNC para validar los datos del cliente', () => {

    // positivos
    test('Validar consulta con cedula existente', async ({ page }) => {

        const BASE = new BasePage(page)
        const GRC = new GRCPage(page)
        let consultaDatosResponse: string

        await test.step('Abrir Instancia GRC', async () => {
            await BASE.NewInstance('Gestión Rescate de Cuotas')
        })

        await test.step('Seleccionar tipo de documento "Cedula" y consultar', async () => {
            consultaDatosResponse = await GRC.consultarDatosPersona('Cédula', '40215782786')
        })

        await test.step('Validar que en el campo "Nombre del Aportante" contenga el nombre de la persona', async () => {
            expect(consultaDatosResponse).toContain('JORJAN DE LA CRUZ')
        })
    });

    // Negativo
    test('Validar consulta con cedula inexistente', async ({ page }) => {

        const base = new BasePage(page)
        const GRC = new GRCPage(page)
        let consultaDatosResponse: string

        await test.step('Abrir Instancia GRC', async () => {
            await base.NewInstance('Gestión Rescate de Cuotas');
        })

        await test.step('Seleccionar tipo de documento "Cedula" y consultar', async () => {
            consultaDatosResponse = await GRC.consultarDatosPersona('Cédula', 'ldskjnfkl4')
        })
        await test.step('Validar que en el campo "Nombre del Aportante" contenga el nombre de la persona', async () => {
            expect(consultaDatosResponse).toContain('undefined')
        })
    });

    // positivos
    test('Validar consulta con RNC existente', async ({ page }) => {

        const BASE = new BasePage(page)
        const GRC = new GRCPage(page)
        let consultaDatosResponse: string

        await test.step('Abrir Instancia GRC', async () => {
            await BASE.NewInstance('Gestión Rescate de Cuotas')
        })

        await test.step('Seleccionar tipo de documento "Cedula" y consultar', async () => {
            consultaDatosResponse = await GRC.consultarDatosPersona('RNC', '00101180230')
        })

        await test.step('Validar que en el campo "Nombre del Aportante" contenga el nombre de la persona', async () => {
            expect(consultaDatosResponse).toContain('JOSE MANUEL RODRIGUEZ GONZALEZ')
        })
    });

    // negativo
    test('Validar consulta con RNC inexistente', async ({ page }) => {

        const BASE = new BasePage(page)
        const GRC = new GRCPage(page)
        let consultaDatosResponse: string

        await test.step('Abrir Instancia GRC', async () => {
            await BASE.NewInstance('Gestión Rescate de Cuotas')
        })

        await test.step('Seleccionar tipo de documento "Cedula" y consultar', async () => {
            consultaDatosResponse = await GRC.consultarDatosPersona('RNC', '4fsddsf')
        })

        await test.step('Validar que en el campo "Nombre del Aportante" contenga el nombre de la persona', async () => {
            expect(consultaDatosResponse).toContain('undefined')
        })
    });

})