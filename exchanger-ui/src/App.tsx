import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';

import { createGlobalStyle } from 'styled-components';
import { MainPage } from './pages/MainPage/MainPage';

const GlobalStyles = createGlobalStyle`
  html {
    --accent: #26c499;
    --lightAccent: #2fe8b3;
    --backgroundPrimary: #0f100f;
    --backgroundSecondary: #212422;
    --backgroundTertiary: #555756;
  }
`;

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.root} element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
