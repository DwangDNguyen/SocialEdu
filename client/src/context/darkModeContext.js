import { useReducer, useEffect } from "react";
import { createContext } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
    darkMode: JSON.parse(localStorage.getItem("mode")) || null,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(state.darkMode));
    });
    return (
        <DarkModeContext.Provider
            value={{ darkMode: state.darkMode, dispatch }}
        >
            {children}
        </DarkModeContext.Provider>
    );
};
