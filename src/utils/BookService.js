import { API_URL } from "./config";

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
		console.log(res);
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
	  	if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = await res.json();
		console.log(data);
        return data.data;
	}
}