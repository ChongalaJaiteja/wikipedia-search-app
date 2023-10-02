//All Rights Reserved
// Import necessary components and libraries
import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { WikipediaContext } from "./Context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ModelStateProvider } from "./modelStateContext";

// Define light and dark themes with their respective colors
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

// Define common colors used in both themes
const commonColors = {
    primaryAccentColor: "#007BFF",
    secondaryAccentColor: "#FF4500",
    successAccentColor: "#28A745",
    warningAccentColor: "#FFC107",
    infoAccentColor: "#17A2B8",
};

// Define the main App component
const App = () => {
    // Use useState to manage the theme state, and retrieve it from localStorage
    const [isLightTheme, changeTheme] = useState(() =>
        JSON.parse(localStorage.getItem("lightMode"))
    );

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        localStorage.setItem("lightMode", !isLightTheme);
        changeTheme((prevState) => !prevState);
    };

    // Determine the current theme based on the state
    const currentTheme = {
        ...theme[isLightTheme ? "light" : "dark"],
        ...commonColors,
        isLightTheme,
    };
    return (
        // Wrap the entire application in a theme provider with the current theme
        <ThemeProvider theme={currentTheme}>
            {/* Provide theme-related context to components */}
            <WikipediaContext.Provider
                value={{
                    isLightTheme,
                    toggleTheme,
                }}
            >
                {/* Apply global styles */}
                <GlobalStyles />

                <ModelStateProvider>
                    {/* Set up routing using React Router */}
                    <BrowserRouter>
                        <Routes>
                            {/* Define routes and their corresponding components */}
                            <Route
                                path="/wikipedia-search-app"
                                element={<Home />}
                            />
                            <Route path="/wikipedia" element={<Wikipedia />} />
                            <Route path="/history" />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ModelStateProvider>
            </WikipediaContext.Provider>
        </ThemeProvider>
    );
};

export default App;
