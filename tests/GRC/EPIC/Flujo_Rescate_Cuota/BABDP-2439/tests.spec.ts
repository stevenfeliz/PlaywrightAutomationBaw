import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../../POM/base/base.page';
import { GRCPage } from '../../../../../POM/GRC/GRC.page';


test.describe('BABDP-2439 | Yo como usuario del proceso necesito poder agregar comentarios que contengan caracteres especiales y poder borrar o editar un comentario que el mismo usuario haya agregado', () => {

    // Caso de prueba

    test('Validar que existe boton para agregar y consultar comentarios', async ({ page }) => {
        const base = new BasePage(page)
        const GRC = new GRCPage(page)

        await test.step('Abrir instancia de Gestion Rescate Cuotas', async () => {
            await base.NewInstance('Gestión Rescate de Cuotas')

        })
        await test.step('Validar que el boton de comentario existe', async () => {
            const comentariosbtn = GRC.GRCElements.getButtonComentarios()

            expect(comentariosbtn).toBeVisible()

        })

    });

    test('Validar agregado de comentario con caracteres especiales', async ({ page }) => {
        const base = new BasePage(page)
        const GRC = new GRCPage(page)

        await test.step('Abrir instancia de Gestion Rescate Cuotas', async () => {
            await base.NewInstance('Gestión Rescate de Cuotas')

        })
        await test.step('clic al boton comentarios', async () => {
            await GRC.GRCElements.getButtonComentarios().click()
            await GRC.GRCElements.getinputComentarios().fill('prueba@@@@111')
            await GRC.GRCElements.getGuardarComentarios().click()

            const valueInput = await GRC.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
            expect(valueInput).toContain('prueba@@@@111')
        })
        await test.step('Agregar nuevo comentario y validar subida', async () => {
            await GRC.GRCElements.getinputComentarios().fill('prueba@@@@111')
            await GRC.GRCElements.getGuardarComentarios().click()

            const valueInput = await GRC.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
            expect(valueInput).toContain('prueba@@@@111')
        })

    });
    test('Validar edicion y eliminacion de comentario', async ({ page }) => {
        const base = new BasePage(page)
        const GRC = new GRCPage(page)

        await test.step('Abrir instancia de Gestion Rescate Cuotas', async () => {
            await base.NewInstance('Gestión Rescate de Cuotas')

        })
        await test.step('clic al boton comentarios', async () => {
            await GRC.GRCElements.getButtonComentarios().click()
        })
        await test.step('Agregar nuevo comentario y validar subida', async () => {
            await GRC.GRCElements.getinputComentarios().fill('prueba@@@@111')
            await GRC.GRCElements.getGuardarComentarios().click()

            const valueInput = await GRC.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
            expect(valueInput).toContain('prueba@@@@111')
        })
        await test.step('Editar comentario', async () => {
            await GRC.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').fill('editado')


            const valueInput = await GRC.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
            expect(valueInput).toContain('editado')
        })
        await test.step('Borrar comentario', async () => {
            await GRC.iframe().locator('button[id="button-button-Table1:Button3[0]"]').click()
            const valueInput = await GRC.iframe().locator('.outerTable table tbody tr').count()
            expect(valueInput).toEqual(0)
        })

    });




})

