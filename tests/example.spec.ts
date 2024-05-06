
import { test, expect } from '@playwright/test';
import path from 'path';
import { BaseElements } from '../POM/base/base.elements';
import { BaseActions } from '../POM/base/base.actions';


test('test2', async ({ page }) => {

    const accion = new BaseActions(page)


    await accion.LogIn()

    await page.pause()
    // await page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal/launchTaskCompletion?taskId=43614')


    // await page.pause()
    // const iframe =  page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div ifram')

    // const locator = iframe.owner();
    // await expect(locator).toBeVisible();


    // await iframe.getByRole('button', { name: 'documentos' }).waitFor({timeout:20000}).then(async()=>{

    //      await iframe.getByRole('button', { name: 'documentos' }).click()
    //  })


})




