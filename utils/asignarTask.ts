import { type Browser, type Page, chromium, expect } from "@playwright/test"



export const AsignarTask = async (instanceId: number, taskName: string) => {

    const browser: Browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page: Page = await context.newPage()

    await page.goto('https://bpd.automationcloud.ibm.com/dba/test/teamworks/executecf?processApp=GA&serviceName=DEMOS%20SERVICIOS%20MULTIPLES');

    const iframe = page.frameLocator('#coach_div iframe')

    await iframe.locator('#button-button-btn_avanzar').click()
    await iframe.locator('#text-input-t_instanceID').fill(`${instanceId}`)
    await iframe.locator('#button-button-btn_asignar').click()

    
    expect(await iframe.locator('input[id="table-rowselect-tb_Table[0]"]')).toBeVisible({timeout:10000}).then(async()=>{


        const TasksList = await iframe.locator(`div[data-viewid="tarea1"] p`).allTextContents()

        for (let i = 0; i < TasksList.length; i++) {
    
            if (TasksList[i] == taskName) {
                await iframe.locator(`input[id="table-rowselect-tb_Table[${i}]"]`).check()
                await iframe.locator('#button-button-btn_asignar').click()
            }
    
    
        }
    
    })
    

}