import { API_URL } from './config';

export const GenreService = {
    getGenres: async () => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${ API_URL }/${server}/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    }
};