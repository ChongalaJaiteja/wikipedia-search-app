//All Rights Reserved
import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import { GlobalStyles } from "./globalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ModelStateProvider } from "./modelStateContext";
import { ThemeContextProvider } from "./themeContext";
import { WikipediaProvider } from "./wikipediaContext";

const App = () => (
    <WikipediaProvider>
        <ThemeContextProvider>
            <GlobalStyles />
            <ModelStateProvider>
                <BrowserRouter>
                    <Routes>
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
        </ThemeContextProvider>
    </WikipediaProvider>
);

export default App;
