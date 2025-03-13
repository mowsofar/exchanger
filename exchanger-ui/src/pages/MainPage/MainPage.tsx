import React from 'react';
import { ExchangeModal } from '../../components/ExchangeModal/ExchangeModal';
import { useMainPage } from './MainPage.hooks';
import { StyledDescription, StyledLayout } from './MainPage.styled';

export const MainPage: React.FC = () => {
    const { getExchangeCourse, setSourceCurrency, setTargetCurrency, handleChangeCurrencies, error, setError } =
        useMainPage();

    return (
        <>
            <head>
                <title>Кукушка - надёжный обменник криптовалют</title>
            </head>
            <StyledLayout>
                <StyledDescription>Обменивайте быстро, безопасно и выгодно</StyledDescription>
                <ExchangeModal
                    getExchangeCourse={getExchangeCourse}
                    setSourceCurrency={setSourceCurrency}
                    setTargetCurrency={setTargetCurrency}
                    handleChangeCurrencies={handleChangeCurrencies}
                    error={error}
                    setError={setError}
                />
            </StyledLayout>
        </>
    );
};
