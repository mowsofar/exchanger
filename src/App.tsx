import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { MainLayout } from './components/MainLayout';
import { theme } from './constants/theme';

const App: React.FC = () => {
    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.root} element={<MainLayout />}>
                        <Route index element="" />
                        <Route path={ROUTES.currency} element="" />
                        <Route path={ROUTES.currencyCode} element="" />
                        <Route path="*" element="" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
