import { TypesTasksByInstance } from '../../interfaces/TasksByInstance.types';

import cookiesJSON from '../../config/auth/auth.json';
const cookiesArray = cookiesJSON.cookies;

export const TaskByInstance = async (instanceID: number) => {

    const url = `https://bpd.automationcloud.ibm.com/dba/test/rest/bpm/wle/v1/process/${instanceID}/taskSummary/All?offset=0&limit=50`;



    const cookiesString = cookiesArray.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Cookie': cookiesString
        }
    };

    try {
        const response: TypesTasksByInstance = await fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => console.error('Error en fetch:', error));


        return response.data.tasks
    } catch (error) {

    }


}




