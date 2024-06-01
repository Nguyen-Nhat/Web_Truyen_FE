import { API_URL } from "./config";

export const OverviewService = {
    getOverviewService: async (decodeUrl) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${API_URL}/${server}/overview?url=${decodeUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    }
}

