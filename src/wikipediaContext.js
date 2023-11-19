// Import necessary modules from React
import { createContext, useContext, useState } from "react";

// Create a WikipediaContext using createContext to provide Wikipedia-related data to components
export const WikipediaContext = createContext();

// Create a custom hook 'useWikipediaContext' to easily access the Wikipedia context in components
export const useWikipediaContext = () => useContext(WikipediaContext);

// Define the WikipediaProvider component responsible for managing Wikipedia-related state and providing it to the app
export const WikipediaProvider = ({ children }) => {
    // Initialize a state variable 'isLightTheme' using useState to track the current light or dark theme
    const [isLightTheme, setIsLightTheme] = useState(() => {
        try {
            // Attempt to retrieve the 'lightMode' value from local storage and parse it as JSON
            const storedValue = JSON.parse(localStorage.getItem("lightMode"));
            // If the value is not null, use the stored value; otherwise, default to 'false'
            return storedValue !== null ? storedValue : false;
        } catch (error) {
            // If there is an error while parsing or retrieving the value, default to 'true'
            return true;
        }
    });
    // Define a function 'toggleTheme' to switch between light and dark themes
    const toggleTheme = () => {
        localStorage.setItem("lightMode", !isLightTheme);
        setIsLightTheme((prevState) => !prevState);
    };

    // Provide Wikipedia-related data, including the current theme and toggle function, to components
    return (
        <WikipediaContext.Provider
            value={{
                isLightTheme,
                toggleTheme,
            }}
        >
            {children}
            {/* Render the child components wrapped within the WikipediaContext.Provider */}
        </WikipediaContext.Provider>
    );
};
