import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { AppLayout } from './components/AppLayout';
import { PaymentSystems } from './pages/PaymentSystems';
import { Login } from './pages/Login/Login';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.root} element={<AppLayout />}>
                    <Route path={ROUTES.paymentSystems} element={<PaymentSystems />} />
                    <Route path={ROUTES.currency} element="" />
                    <Route path={ROUTES.currencyCode} element="" />
                    <Route path="*" element="" />
                </Route>
                <Route path={ROUTES.login} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
