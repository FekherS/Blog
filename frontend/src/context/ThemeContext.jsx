import React, { createContext, useState } from 'react';
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || "retro");
    const setDarkMode = (setDarkModeFlag) => {
        const newTheme = setDarkModeFlag ? "dark" : "retro"
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }
    return (
        <ThemeContext.Provider value={{theme, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}