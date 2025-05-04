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
import { ExchangeDirectionsPage } from './pages/ExchangeDirectionsPage/ExchangeDirectionsPage';
import { AdditionalFieldsPage } from './pages/AdditionalFieldsPage/AdditionalFieldsPage';
import { RequisitesPage } from './pages/RequisitesPage/RequisitesPage';
import { AuthCheckRedirect } from './components/AuthCheckRedirect/AuthCheckRedirect';
import { PreliminaryPayoutsPage } from './pages/PreliminaryPayoutsPage/PreliminaryPayoutsPage';
import { ProcessPayoutsPage } from './pages/ProcessPayoutsPage/ProcessPayoutsPage';
import { CompletedPayoutsPage } from './pages/CompletedPayoutsPage/CompletedPayoutsPage';
import { DeletedPayoutsPage } from './pages/DeletedPayoutsPage/DeletedPayoutsPage';
import { ErrorPayoutsPage } from './pages/ErrorPayoutsPage/ErrorPayoutsPage';
import { PayoutsPage } from './pages/PayoutsPage/PayoutsPage';
import { RequisitesPayoutsPage } from './pages/RequisitesPayoutsPage/RequisitesPayoutsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { AutobrokerPage } from './pages/AutobrokerPage/AutobrokerPage';

const App: React.FC = () => {
    const selectedCurrency = useStore($selectedCurrency);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/content-admin" element={<AuthCheckRedirect />} />

                <Route path={ROUTES.root} element={<AppLayout />}>
                    <Route path={ROUTES.paymentSystems} element={<PaymentSystemsPage />} />
                    <Route path={ROUTES.currencyCode} element={<CurrencyCodePage />} />
                    <Route path={ROUTES.currency} element={<CurrenciesPage />} />
                    <Route path={ROUTES.payouts.index} element={<PayoutsPage />} />
                    <Route path={ROUTES.payouts.preliminary} element={<PreliminaryPayoutsPage />} />
                    <Route path={ROUTES.payouts.waitingRequisites} element={<RequisitesPayoutsPage />} />
                    <Route path={ROUTES.payouts.completed} element={<CompletedPayoutsPage />} />
                    <Route path={ROUTES.payouts.rejected} element={<DeletedPayoutsPage />} />
                    <Route path={ROUTES.payouts.process} element={<ProcessPayoutsPage />} />
                    <Route path={ROUTES.payouts.error} element={<ErrorPayoutsPage />} />
                    <Route path={ROUTES.currencyGenerals(selectedCurrency?.id)} element={<CurrenciesGeneralsPage />} />
                    <Route path={ROUTES.exchangeDirections} element={<ExchangeDirectionsPage />} />
                    <Route path={ROUTES.additionalFields} element={<AdditionalFieldsPage />} />
                    <Route path={ROUTES.requisites} element={<RequisitesPage />} />
                    <Route path={ROUTES.settings} element={<SettingsPage />} />
                    <Route path={ROUTES.autobroker} element={<AutobrokerPage />} />
                    <Route path="*" element="" />
                </Route>
                <Route path={ROUTES.login} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
