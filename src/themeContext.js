import { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { useWikipediaContext } from "./wikipediaContext";

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

const commonColors = {
    primaryAccentColor: "#007BFF",
    secondaryAccentColor: "#FF4500",
    successAccentColor: "#28A745",
    warningAccentColor: "#FFC107",
    infoAccentColor: "#17A2B8",
};

const ThemeContext = createContext();

export const useThemeProvider = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const { isLightTheme } = useWikipediaContext();
    const currentTheme = {
        ...theme[isLightTheme ? "light" : "dark"],
        ...commonColors,
        isLightTheme,
    };

    return (
        <ThemeContext.Provider value={""}>
            <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
