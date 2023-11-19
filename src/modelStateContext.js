// Import necessary modules from React
import { createContext, useContext, useState } from "react";

// Create a ModelStateContext using createContext, which will provide state related to the application model
export const ModelStateContext = createContext();

// Create a custom hook 'useModelState' to easily access the model state context in components
export const useModelState = () => useContext(ModelStateContext);

// Define the ModelStateProvider component responsible for managing the application model state and providing it to the app
export const ModelStateProvider = ({ children }) => {
    // Initialize a state variable 'showModel' using useState to control the visibility of a model
    const [showModel, setShowModel] = useState(false);

    // Define a function 'openModel' to set 'showModel' to true, indicating that the model should be displayed
    const openModel = () => setShowModel(true);

    // Define a function 'closeModel' to set 'showModel' to false, indicating that the model should be hidden
    const closeModel = () => setShowModel(false);

    // Provide model state and related functions to the components within the ModelStateContext.Provider
    return (
        <ModelStateContext.Provider
            value={{ showModel, openModel, closeModel }}
        >
            {children}
        </ModelStateContext.Provider>
    );
};
