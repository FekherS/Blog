import React, { createContext, useEffect, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem('token') || null);
	const [userName, setUserName] = useState(() => localStorage.getItem('userName') || null);
	const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);

    const login = (jwt, name, id) => {
		localStorage.setItem('token', jwt);
		setToken(jwt);

		localStorage.setItem('userName', name);
		setUserName(name);

		localStorage.setItem('userId', id);
		setUserId(id);
	};

    const logout = () => {
		localStorage.removeItem('token');
		setToken(null);

		localStorage.removeItem('userName');
		setUserName(null);
		
		localStorage.removeItem('userId');
        setUserId(null);
	};

	const isLoggedIn = !!token;

	return (
		<LoginContext.Provider value={{ token, userName, userId, isLoggedIn, login, logout }}>
			{children}
		</LoginContext.Provider>
	);
};
