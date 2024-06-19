import { API_URL } from './config';

export const StoryDetailService = {

    getChapter: async (decodeUrl) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${API_URL}/${server}/details?url=${decodeUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    },
    getListAllChapter: async (decodeUrl) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${API_URL}/${server}/details?url=${decodeUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data.chapters;
    },
};

