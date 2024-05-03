import cookiesJSON from '../../config/auth/auth.json';
import { TypesStatusByInstance } from '../../interfaces/StatusByInstance.types';
const cookiesArray = cookiesJSON.cookies;

export const StatusByInstance = async (id:number) => {

    const url = `https://bpd.automationcloud.ibm.com/dba/test/rest/bpm/wle/v1/process/${id}?parts=summary%2Cactions%2Cdiagram`;


    const cookiesString = cookiesArray.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Cookie': cookiesString
        }
    };


   const response:TypesStatusByInstance = await fetch(url, requestOptions)
        .then(response => response.json())
        .catch(error => console.error('Error en fetch:', error));


    return response.data.executionState

}




