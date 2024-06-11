import { API_URL } from './config';

export const ServerService = {
    getServers: async () => {
        const res = await fetch(`${ API_URL }/servers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data.data;
    }
};