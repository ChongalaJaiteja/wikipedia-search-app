import { createContext, useContext, useState } from "react";

export const WikipediaContext = createContext();

export const useWikipediaContext = () => useContext(WikipediaContext);

export const WikipediaProvider = ({ children }) => {
    const [isLightTheme, setIsLightTheme] = useState(() => {
        try {
            const storedValue = JSON.parse(localStorage.getItem("lightMode"));
            return storedValue !== null ? storedValue : true;
        } catch (error) {
            return true;
        }
    });
    const toggleTheme = () => {
        localStorage.setItem("lightMode", !isLightTheme);
        setIsLightTheme((prevState) => !prevState);
    };

    return (
        <WikipediaContext.Provider
            value={{
                isLightTheme,
                toggleTheme,
            }}
        >
            {children}
        </WikipediaContext.Provider>
    );
};
