import { API_URL } from './config';

export const BookService = {
    searchByName: async (query, page) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${ API_URL }/${server}/search?q=${query}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    },
    searchByGenre: async (genre, page) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${ API_URL }/${server}/genre?genre=${genre}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    },
    getByAuthor: async (url, page) => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${ API_URL }/${server}/author?url=${url}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    },
    getRecommendation: async () => {
        const server = localStorage.getItem('server');
        const res = await fetch(`${ API_URL }/${server}/recommendation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    },
};