import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from '../Calculator/Calculator';
import { CurrencyRate } from '../CurrencyRate/CurrencyRate';
import { StyledButton, StyledHeader, StyledModal } from './ExchangeModal.styled';
import { ROUTES } from '../../constants/routes';
import { CurrenciesModal } from '../CurrenciesModal/CurrenciesModal';
import { Currency } from '../../api/types/common';
import { useStore } from '@nanostores/react';
import { $exchangeError } from '../../stores/currencies.store';

interface ExchangeModalProps {
    getExchangeCourse: (sourceId: number, targetId: number) => void;
    setSourceCurrency: (sourceCurrency: Currency) => void;
    setTargetCurrency: (targetCurrency: Currency) => void;
    handleChangeCurrencies: (sourceCurrency: Currency, targetCurrency: Currency) => void;
    error: string;
    setError: (error: string) => void;
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({
    getExchangeCourse,
    setSourceCurrency,
    setTargetCurrency,
    handleChangeCurrencies,
    error,
    setError,
}) => {
    const [isCurrenciesModalOpen, setCurrencyModalOpen] = React.useState(false);

    const exchangeError = useStore($exchangeError);

    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate(ROUTES.userDetails);
    };

    return (
        <StyledModal>
            <StyledHeader>Калькулятор</StyledHeader>
            <CurrencyRate onComplete={getExchangeCourse} />
            <Calculator
                handleClickSourceCurrency={() => setCurrencyModalOpen(true)}
                handleClickTargetCurrency={() => setCurrencyModalOpen(true)}
                handleChangeCurrencies={handleChangeCurrencies}
                error={error}
                setError={setError}
            />
            <StyledButton onClick={handleClickButton} disabled={Boolean(exchangeError)}>
                Перейти к вводу реквизитов
            </StyledButton>

            <CurrenciesModal
                opened={isCurrenciesModalOpen}
                onClose={() => setCurrencyModalOpen(false)}
                setSourceCurrency={setSourceCurrency}
                setTargetCurrency={setTargetCurrency}
            />
        </StyledModal>
    );
};
