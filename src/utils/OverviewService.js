import { API_URL } from './config';

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
        // console.log("Test URL ovever", `${API_URL}/${server}/overview?url=${decodeUrl}`);
        return data.data;
    },
    ChapterInforByPage: async (decodeUrl, page) => {
        const server = localStorage.getItem('server');
        if (decodeUrl.endsWith('/')) {
            decodeUrl = decodeUrl.slice(0, -1);
        }
        const res = await fetch(`${API_URL}/${server}/chapter?url=${decodeUrl}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // console.log("Test URL page chapter", `${API_URL}/${server}/chapter?url=${decodeUrl}&page=${page}`);
        // console.log("Test data Page", data.data)
        return data.data;
    },
};

