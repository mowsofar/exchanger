import React from 'react';
import { ExchangeModal } from '../../components/ExchangeModal/ExchangeModal';
import { useMainPage } from './MainPage.hooks';
import { StyledDescription, StyledLayout } from './MainPage.styled';

export const MainPage: React.FC = () => {
    const { getExchangeCourse, setSourceCurrency } = useMainPage();

    return (
        <StyledLayout>
            <StyledDescription>Обменивайте быстро, безопасно и выгодно</StyledDescription>
            <ExchangeModal getExchangeCourse={getExchangeCourse} setSourceCurrency={setSourceCurrency} />
        </StyledLayout>
    );
};
