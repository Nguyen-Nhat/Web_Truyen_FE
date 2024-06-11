import { API_URL } from "./config";

export const StoryDetailService = {
   
    getChapter: async (decodeUrl) => {
        console.log(decodeUrl);
        const server = localStorage.getItem('server');
        const res = await fetch(`${API_URL}/${server}/details?url=${decodeUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(data.data);
        return data.data;
    },
}

