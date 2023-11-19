// Import necessary modules from React
import { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { useWikipediaContext } from "./wikipediaContext";

// Define theme configurations for light and dark themes
const theme = {
    light: {
        color: "black",
        backgroundColor: "white",
        containerBackground: "#F5F5F5",
        headerBackground: "white",
        primaryText: "#333333",
        secondText: "#666666",
        headerText: "#222222",
        borderColor: "hsl(0, 1%, 56%)",
        divideLineColor: "#DDDDDD",
        inputBackgroundColor: "white",
        inputText: "black",
        placeholderText: "#888888",
        inputBorderColor: "#bfbfbfbf",
        linkColor: "#007BFF",
    },
    dark: {
        color: "white",
        backgroundColor: "#272829",
        containerBackground: "#1E1E1E",
        headerBackground: "#272829",
        primaryText: "#FFFFFF",
        secondText: "#CCCCCC",
        headerText: "#FFFFFF",
        borderColor: "grey",
        divideLineColor: "#444444",
        inputBackgroundColor: "#333333",
        inputText: "#FFFFFF",
        placeholderText: "#888888",
        inputBorderColor: "#555555",
        linkColor: "rgb(57, 153, 255)",
    },
};

// Define common colors that can be used across themes
const commonColors = {
    primaryAccentColor: "#007BFF",
    secondaryAccentColor: "#FF4500",
    successAccentColor: "#28A745",
    warningAccentColor: "#FFC107",
    infoAccentColor: "#17A2B8",
};

// Create a ThemeContext using createContext to provide theme-related data to components
const ThemeContext = createContext();

// Create a custom hook 'useThemeProvider' to easily access the theme context in components
export const useThemeProvider = () => useContext(ThemeContext);

// Define the ThemeContextProvider component responsible for managing the theme and providing it to the app
export const ThemeContextProvider = ({ children }) => {
    // Use the 'useWikipediaContext' hook to access the Wikipedia context and determine if it's a light or dark theme
    const { isLightTheme } = useWikipediaContext();

    // Create the current theme object by merging theme properties based on the selected theme (light or dark)
    const currentTheme = {
        ...theme[isLightTheme ? "light" : "dark"],
        ...commonColors,
        isLightTheme,
    };

    // Provide the current theme to components within the ThemeContext.Provider and Styled-Components ThemeProvider
    return (
        <ThemeContext.Provider value={""}>
            <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
