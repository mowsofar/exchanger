import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';

import { createGlobalStyle } from 'styled-components';
import { MainPage } from './pages/MainPage/MainPage';
import { AppLayout } from './components/AppLayout/AppLayout';
import { UserDetailsPage } from './pages/UserDetailsPage/UserDetailsPage';
import { ModalsProvider } from '@salutejs/plasma-web';
import { PaymentPage } from './pages/PaymentPage/PaymentPage';
import { PayoutStatusPage } from './pages/PayoutStatusPage/PayoutStatusPage';
import { RulesPage } from './pages/RulesPage/RulesPage';
import { FaqPage } from './pages/FaqPage/FaqPage';
import { AmlKycPage } from './pages/AmlKycPage/AmlKycPage';
import { AccountPage } from './pages/AccountPage/AccountPage';

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
                <ModalsProvider>
                    <Routes>
                        <Route path={ROUTES.root} element={<AppLayout />}>
                            <Route path={ROUTES.root} element={<MainPage />} />
                            <Route path={ROUTES.userDetails()} element={<UserDetailsPage />} />
                            <Route path={ROUTES.payment()} element={<PaymentPage />} />
                            <Route path={ROUTES.payoutStatus()} element={<PayoutStatusPage />} />
                            <Route path={ROUTES.rules} element={<RulesPage />} />
                            <Route path={ROUTES.faq} element={<FaqPage />} />
                            <Route path={ROUTES.amlKyc} element={<AmlKycPage />} />
                            <Route path={ROUTES.profile} element={<AccountPage />} />
                        </Route>
                    </Routes>
                </ModalsProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
