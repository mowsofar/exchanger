import React from 'react';
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

    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);

    const currencyType = useStore($currencyType);

    const [inputValue, setInputValue] = React.useState('');

    const currenciesList =
        currencyType === 'source' ? sourceCurrenciesList : currencyType === 'target' ? targetCurrenciesList : [];

    const selectedCurrencyId = currencyType === 'source' ? sourceCurrency?.id : targetCurrency?.id;

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

    const currencies = React.useMemo(() => {
        if (!inputValue) return currenciesList;

        const newCurrencies = currenciesList.filter(
            (item) =>
                item.paymentSystem.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) ||
                item.currencyCode.code.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
        );

        return newCurrencies;
    }, [currenciesList, inputValue]);

    const closeModal = () => {
        $currencyType.set('');
        onClose();
    };

    return (
        <StyledModal opened={opened} onClose={closeModal} withBlur>
            <StyledHeader>Выберите валюту</StyledHeader>
            <Search placeholder="Поиск" onChange={(e) => setInputValue(e.target.value)} />
            <CurrenciesList>
                {currencies.map((currency) => {
                    return (
                        <StyledRow
                            onClick={() => handleClickCurrency(currency)}
                            isSelected={currency.id === selectedCurrencyId}
                        >
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
