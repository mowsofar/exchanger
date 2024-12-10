import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { AppLayout } from './components/AppLayout';
import { theme } from './constants/theme';
import { PaymentSystems } from './components/PaymentSystems';

const App: React.FC = () => {
    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.root} element={<AppLayout />}>
                        <Route index element={<PaymentSystems />} />
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
