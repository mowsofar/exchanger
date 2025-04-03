import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CurrencyCodePage } from './pages/CurrencyCodePage/CurrencyCodePage';
import { PaymentSystemsPage } from './pages/PaymentSystemsPage/PaymentSystemsPage';
import { CurrenciesPage } from './pages/CurrenciesPage/CurrenciesPage';
import { CurrenciesGeneralsPage } from './pages/CurrenciesGeneralsPage/CurrenciesGeneralsPage';
import { useStore } from '@nanostores/react';
import { $selectedCurrency } from './stores/currency.store';
import { PayoutsPage } from './pages/PayoutsPage/PayoutsPage';
import { PayoutPage } from './pages/PayoutPage/PayoutPage';
import { ExchangeDirectionsPage } from './pages/ExchangeDirectionsPage/ExchangeDirectionsPage';
import { AdditionalFieldsPage } from './pages/AdditionalFieldsPage/AdditionalFieldsPage';
import { RequisitesPage } from './pages/RequisitesPage/RequisitesPage';
import { AuthCheckRedirect } from './components/AuthCheckRedirect/AuthCheckRedirect';

const App: React.FC = () => {
    const selectedCurrency = useStore($selectedCurrency);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/content-admin"
                    element={<AuthCheckRedirect />} // Компонент с логикой редиректа
                />

                <Route path={ROUTES.root} element={<AppLayout />}>
                    <Route path={ROUTES.paymentSystems} element={<PaymentSystemsPage />} />
                    <Route path={ROUTES.currencyCode} element={<CurrencyCodePage />} />
                    <Route path={ROUTES.currency} element={<CurrenciesPage />} />
                    <Route path={ROUTES.payouts} element={<PayoutsPage />}>
                        <Route path={ROUTES.payout()} element={<PayoutPage />} />
                    </Route>
                    <Route path={ROUTES.currencyGenerals(selectedCurrency?.id)} element={<CurrenciesGeneralsPage />} />
                    <Route path={ROUTES.exchangeDirections} element={<ExchangeDirectionsPage />} />
                    <Route path={ROUTES.additionalFields} element={<AdditionalFieldsPage />} />
                    <Route path={ROUTES.requisites} element={<RequisitesPage />} />
                    <Route path="*" element="" />
                </Route>
                <Route path={ROUTES.login} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
