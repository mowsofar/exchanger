import { useStore } from '@nanostores/react';
import { CurrenciesList, StyledCurrencyName, StyledHeader, StyledModal, StyledRow } from './CurrenciesModal.styled';
import {
    $currencyType,
    $sourceCurrencies,
    $sourceCurrency,
    $targetCurrencies,
    $targetCurrency,
} from '../../stores/currencies.store';
import { Currency } from '../../api/types/common';
import { Search } from '../Search/Search';

interface ExchangeModalProps {
    opened: boolean;
    onClose: () => void;
    setSourceCurrency: (sourceCurrency: Currency) => void;
    setTargetCurrency: (targetCurrency: Currency) => void;
}

export const CurrenciesModal: React.FC<ExchangeModalProps> = ({
    opened,
    onClose,
    setSourceCurrency,
    setTargetCurrency,
}) => {
    const sourceCurrenciesList = useStore($sourceCurrencies);
    const targetCurrenciesList = useStore($targetCurrencies);
    const currencyType = useStore($currencyType);

    const currenciesList =
        currencyType === 'source' ? sourceCurrenciesList : currencyType === 'target' ? targetCurrenciesList : [];

    const handleClickCurrency = (currency: Currency) => {
        if (currencyType === 'source') {
            setSourceCurrency(currency);
            $sourceCurrency.set(currency);
        }

        if (currencyType === 'target') {
            setTargetCurrency(currency);
            $targetCurrency.set(currency);
        }
        onClose();
    };

    const closeModal = () => {
        $currencyType.set('');
        onClose();
    };

    return (
        <StyledModal opened={opened} onClose={closeModal} withBlur>
            <StyledHeader>Выберите валюту</StyledHeader>
            <Search placeholder="Поиск" />
            <CurrenciesList>
                {currenciesList.map((currency) => {
                    return (
                        <StyledRow onClick={() => handleClickCurrency(currency)}>
                            <StyledCurrencyName>
                                <img src={currency.paymentSystem.imagePath} alt="" />
                                <div>{`${currency.paymentSystem.name} ${currency.currencyCode.code}`}</div>
                            </StyledCurrencyName>
                        </StyledRow>
                    );
                })}
            </CurrenciesList>
        </StyledModal>
    );
};
