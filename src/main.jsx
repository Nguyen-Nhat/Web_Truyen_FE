import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "../public/css/tailwind.css";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServerProvider } from './context/ServerContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider>
            <QueryClientProvider client={new QueryClient()}>
                <ServerProvider>
                    <App />
                </ServerProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>
)