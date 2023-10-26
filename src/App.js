//All Rights Reserved
import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import History from "./components/history";
import Profile from "./components/profile";
import ProtectedRoute from "./components/protectedRoute";
import { GlobalStyles } from "./globalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
                            <Route path="/wikipedia" element={<Wikipedia />} />
                            <Route
                                path="/history"
                                element={
                                    <ProtectedRoute> 
                                        <History />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="profile"
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
