//All Rights Reserved
import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import { History } from "./components/history";
import Profile from "./components/profile";
import ProtectedRoute from "./components/protectedRoute";
import { GlobalStyles } from "./globalStyles";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import { ModelStateProvider } from "./modelStateContext";
import { ThemeContextProvider } from "./themeContext";
import { WikipediaProvider } from "./wikipediaContext";
import { AuthContextProvider } from "./authContext";

const App = () => (
    <WikipediaProvider>
        <AuthContextProvider>
            <ThemeContextProvider>
                <GlobalStyles />
                <ModelStateProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/wikipedia-search-app"
                                element={<Home />}
                            />
                            <Route
                                path="/wikipedia-search-app/wikipedia"
                                element={<Wikipedia />}
                            />
                            <Route
                                path="/wikipedia-search-app/history"
                                element={
                                    <ProtectedRoute>
                                        <History />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/wikipedia-search-app/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ModelStateProvider>
            </ThemeContextProvider>
        </AuthContextProvider>
    </WikipediaProvider>
);
export default App;
