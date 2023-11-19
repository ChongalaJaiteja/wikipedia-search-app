//All Rights Reserved
// Import necessary components
import Wikipedia from "./components/wikipedia";
import Home from "./components/home";
import NotFound from "./components/notFound";
import { History } from "./components/history";
import Profile from "./components/profile";
import ProtectedRoute from "./components/protectedRoute";
import { GlobalStyles } from "./globalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ModelStateProvider } from "./modelStateContext";
import { ThemeContextProvider } from "./themeContext";
import { WikipediaProvider } from "./wikipediaContext";
import { AuthContextProvider } from "./authContext";

// Define the main App component
const App = () => (
    // Wrap the components with necessary providers
    <WikipediaProvider>
        <AuthContextProvider>
            <ThemeContextProvider>
                {/* Apply global styles using GlobalStyles */}
                <GlobalStyles />
                {/* Use ModelStateProvider to manage state */}
                <ModelStateProvider>
                    {/* Set up routing with BrowserRouter */}
                    <BrowserRouter>
                        <Routes>
                            {/* Define routes for different components */}
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
// Export the App component
export default App;
