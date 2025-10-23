import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { web } from '@salutejs/plasma-tokens-web/typo';
import { light } from '@salutejs/plasma-tokens-web/themes';
import { NotificationsProvider, PopupBaseProvider } from '@salutejs/plasma-web';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const DocumentStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'SB Sans Text', SBSansText, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`;

const ThemeStyle = createGlobalStyle(light);
const TypoStyle = createGlobalStyle(web);

export const GlobalStyle = () => {
    return (
        <>
            <ThemeStyle />
            <TypoStyle />
            <DocumentStyle />
        </>
    );
};

root.render(
    <React.StrictMode>
        <GlobalStyle />
        <PopupBaseProvider>
            <NotificationsProvider>
                <App />
            </NotificationsProvider>
        </PopupBaseProvider>
    </React.StrictMode>,
);
