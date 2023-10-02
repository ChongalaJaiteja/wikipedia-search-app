import { createContext, useContext, useState } from "react";

export const ModelStateContext = createContext();

export const useModelState = () => useContext(ModelStateContext);

export const ModelStateProvider = ({ children }) => {
    const [showModel, setShowModel] = useState(false);

    const openModel = () => setShowModel(true);

    const closeModel = () => setShowModel(false);

    return (
        <ModelStateContext.Provider
            value={{ showModel, openModel, closeModel }}
        >
            {children}
        </ModelStateContext.Provider>
    );
};
