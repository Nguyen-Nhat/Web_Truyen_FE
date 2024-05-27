import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "../public/css/tailwind.css";
import { ThemeProvider } from "@material-tailwind/react";
import { GlobalContextProvider } from './context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <QueryClientProvider client={new QueryClient()}>
                    <GlobalContextProvider>
                        <App />
                    </GlobalContextProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)