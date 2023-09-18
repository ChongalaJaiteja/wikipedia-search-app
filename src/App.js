import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./golbalStyles";
import { WikipediaContext } from "./Context";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
        inputBoaderColor: "#bfbfbfbf",
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
        inputBoaderColor: "#555555",
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

const App = () => {
    const [isLightTheme, changeTheme] = useState(true);
    const toggleTheme = () => changeTheme((prevState) => !prevState);

    const currentTheme = {
        ...theme[isLightTheme ? "light" : "dark"],
        ...commonColors,
        isLightTheme,
    };
    return (
        <ThemeProvider theme={currentTheme}>
            <WikipediaContext.Provider
                value={{
                    isLightTheme,
                    toggleTheme,
                }}
            >
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/wikipedia" element={<Wikipedia />} />
                        <Route path="/history" />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </WikipediaContext.Provider>
        </ThemeProvider>
    );
};
// class App extends Component {
//     state = {
//         isLight: true,
//     };

//     toggleTheme = () => {
//         this.setState((prevState) => ({ isLight: !prevState.isLight }));
//     };

//     render() {
//         const { isLight } = this.state;
//         const currentTheme = isLight ? { ...theme.light } : { ...theme.dark };

//         return (
//             <ThemeProvider theme={{ ...currentTheme, isLight }}>
//                 <WikipediaContext.Provider
//                     value={{ toggleTheme: this.toggleTheme }}
//                 >
//                     <GlobalStyles />
//                     <Wikipedia />
//                 </WikipediaContext.Provider>
//             </ThemeProvider>
//         );
//     }
// }

export default App;
