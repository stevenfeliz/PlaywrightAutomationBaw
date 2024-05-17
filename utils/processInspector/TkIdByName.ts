import { TypesTasksByInstance } from '../../interfaces/TasksByInstance.types';
import cookiesJSON from '../../config/auth/auth.json';

const cookiesArray = cookiesJSON.cookies;

export const TkIdByName = async (instanceID: number, name: string): Promise<number> => {
    const url = `https://bpd.automationcloud.ibm.com/dba/test/rest/bpm/wle/v1/process/${instanceID}/taskSummary/All?offset=0&limit=50`;
    const cookiesString = cookiesArray.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Cookie': cookiesString
        }
    };

    const maxAttempts = 7;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response: TypesTasksByInstance = await fetch(url, requestOptions)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error en fetch:', error);
                    throw error;
                });

            const tareasFiltradas = response.data.tasks.filter(task => task.name.trim().replace(/\s{2,}/g, ' ') === name);

            if (tareasFiltradas.length > 0) {
                return parseInt(tareasFiltradas[0].tkiid);
            }

            console.log(`Intento ${attempt} fallido: tarea no encontrada.`);
        } catch (error) {
            console.error(`Error en el intento ${attempt}:`, error);
            if (attempt === maxAttempts) {
                throw new Error('Número máximo de intentos alcanzado y la tarea no se encontró.');
            }
        }

        // Esperar un breve periodo antes de intentar de nuevo
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo de espera
    }

    return 0; // O lanzar un error si prefieres
};
