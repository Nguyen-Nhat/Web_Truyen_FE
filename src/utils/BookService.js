import { API_URL } from "./config";

export const BookService = {
	search: async (query) => {
		const server = localStorage.getItem('server');
		const res = await fetch(`${ API_URL }/${server}/search?q=${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
            },
		});
		const data = await res.json();
        return data;
	}
}