import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { web } from '@salutejs/plasma-tokens-web/typo';
import { light } from '@salutejs/plasma-tokens-web/themes';
import { NotificationsProvider, PopupBaseProvider } from '@salutejs/plasma-web';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const ThemeStyle = createGlobalStyle(light);
const TypoStyle = createGlobalStyle(web);

export const GlobalStyle = () => {
    return (
        <>
            <ThemeStyle />
            <TypoStyle />
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
