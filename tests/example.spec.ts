
import { test, expect } from '@playwright/test';
import {StatusByInstance} from '../utils/processInspector/StatusByInstance'

import cookiesJSON from '../config/auth/auth.json'
import { TkIdByName } from '../utils/processInspector/TkIdByName';



test('test2', async ({ page }) => {

  // await page.goto('https://bpd.automationcloud.ibm.com/dba/test/ProcessPortal/launchTaskCompletion?taskId=43138');
  
  
 const resp = await TkIdByName(10971,'Crear Solicitu')
  
console.log(resp)




  // await page.frameLocator('iframe[title="Step\\: Crear Solicitud"]').frameLocator('iframe[title="Crear Solicitud"]').getByRole('button', { name: 'Add Row' }).click();

  // await page.waitForTimeout(8000)


  // await page.frameLocator('iframe[title="Step\\: Crear Solicitud"]').frameLocator('iframe[title="Crear Solicitud"]').getByRole('button', { name: 'Add Row' }).click();
})

function StatusByInstanc(arg0: number) {
  throw new Error('Function not implemented.');
}
