import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';

import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MainPage } from './pages/MainPage/MainPage';
import { AppLayout } from './components/AppLayout/AppLayout';
import { UserDetailsPage } from './pages/UserDetailsPage/UserDetailsPage';
import { ModalsProvider, NotificationsProvider } from '@salutejs/plasma-web';
import { PaymentPage } from './pages/PaymentPage/PaymentPage';
import { PayoutStatusPage } from './pages/PayoutStatusPage/PayoutStatusPage';
import { RulesPage } from './pages/RulesPage/RulesPage';
import { FaqPage } from './pages/FaqPage/FaqPage';
import { AmlKycPage } from './pages/AmlKycPage/AmlKycPage';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage/ChangePasswordPage';
import { darkTheme, lightTheme } from './themes';
import { ThemeProvider, useTheme } from './components/ThemeSwitch/ThemeContext';

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme | typeof darkTheme }>`
  html {
    --accent: ${(props) => props.theme?.colors?.accent};
    --lightAccent: ${(props) => props.theme?.colors?.lightAccent};
    --backgroundPrimary: ${(props) => props.theme?.colors?.backgroundPrimary};
    --backgroundSecondary: ${(props) => props.theme?.colors?.backgroundSecondary};
    --backgroundTertiary: ${(props) => props.theme?.colors?.backgroundTertiary};
    --backgroundFourth: ${(props) => props.theme?.colors?.backgroundFourth};
    --text: ${(props) => props.theme?.colors?.text};
    --accentText: ${(props) => props.theme?.colors?.accentText};
    --skeleton: ${(props) => props.theme?.colors?.skeleton};
  }
`;

const ThemedApp = () => {
    const { theme } = useTheme();

    return (
        <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyles />
            <BrowserRouter>
                <NotificationsProvider placement="bottom-left">
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
                                <Route path={ROUTES.settings} element={<ChangePasswordPage />} />
                            </Route>
                        </Routes>
                    </ModalsProvider>
                </NotificationsProvider>
            </BrowserRouter>
        </StyledThemeProvider>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ThemedApp />
        </ThemeProvider>
    );
};

export default App;
