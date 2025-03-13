import React, { useCallback } from 'react';
import { createCurrency, deleteCurrency, getCurrencies, getCurrencyCodes, getPaymentSystems } from '../../api/handlers';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { useNotification } from '../../hooks/useNotification';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { $currencyList } from '../../stores/currency.store';

export const useCurrenciesPage = () => {
    const showNotification = useNotification();

    const getCurrenciesList = useCallback(
        async () => {
                try {
                    const currencies = await getCurrencies();
                    $currencyList.set(currencies);

                } catch (error) {
                    showNotification('Ошибка получения списка валют', 'error', error);
                }
            }, [showNotification]
    );
    
    const getCurrencyCodeList = useCallback(
        async () => {
                try {
                    const currencyCodes = await getCurrencyCodes();
                    $currencyCodeList.set(currencyCodes);

                } catch (error) {
                    showNotification('Не удалось получить список кодов валют', 'error', error);
                }
            }, [showNotification]
    );

    const getPaymentSystemsList = useCallback(
        async () => {
                try {
                    const paymentSystems = await getPaymentSystems();
                    $paymentSystemsList.set(paymentSystems);

                } catch (error) {
                    showNotification('Не удалось получить список платёжный систем', 'error', error);
                }
            }, [showNotification]
    );

    const createCurrencyItem = useCallback(
        async (paymentSystemId: number, currencyCodeId: number, xmlCode: string, decimalPlaces: number, filterType: string) => {
                try {
                    await createCurrency(paymentSystemId, currencyCodeId, xmlCode, decimalPlaces, filterType);
                    showNotification('Валюта успешно создана', 'success');
                    setTimeout(() => getCurrenciesList(), 1000);
                } catch (error) {
                    showNotification('Не удалось создать валюту', 'error', error);
                }
            }, [getCurrenciesList, showNotification]
    );

    const deleteCurrencyItem = useCallback(
        async (currencyId: number) => {
                try {
                    await deleteCurrency(currencyId);
                    showNotification('Валюта успешно удалена', 'success');
                    setTimeout(() => getCurrenciesList(), 1000);
                } catch (error) {
                    showNotification('Не удалось удалить валюту', 'error', error);
                }
            }, [getCurrenciesList, showNotification]
    );


    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);

    React.useEffect(() => {
        getCurrencyCodeList();
        getPaymentSystemsList();
    }, [getCurrencyCodeList, getPaymentSystemsList]);


    return { createCurrencyItem, deleteCurrencyItem };

};
