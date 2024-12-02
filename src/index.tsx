import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        min-height: 100vh;
        background-color: #030f44;
    }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <App />
    </React.StrictMode>,
);
