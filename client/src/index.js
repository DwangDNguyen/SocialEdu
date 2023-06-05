import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <DarkModeContextProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </PersistGate>
            </Provider>
        </DarkModeContextProvider>
    </AuthContextProvider>
    // </React.StrictMode>
);
