import { createContext, useState } from 'react';

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
	const [server, setServer] = useState(localStorage.getItem('server') || '');

	return (
		<ServerContext.Provider value={{ server, setServer }}>
			{children}
		</ServerContext.Provider>
	);
};