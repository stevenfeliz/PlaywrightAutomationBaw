import { TypesTasksByInstance } from '../../interfaces/TasksByInstance.types';

import cookiesJSON from '../../config/auth/auth.json';
const cookiesArray = cookiesJSON.cookies;

export const TkIdByName = async (instanceID: number, name: string): Promise<number | string> => {

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


        const tareasFiltradas = response.data.tasks.filter(task => task.name.trim().replace(/\s{2,}/g, ' ') === name);


        if (tareasFiltradas.length > 0) {
            return tareasFiltradas[0].tkiid
        } else {
            return 0
        }
    } catch (error) {
        throw error
    }

}




