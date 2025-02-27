import React, { useCallback } from 'react';
import { editCurrency, getCurrency, getCurrencyCodes, getPaymentSystems } from '../../api/handlers';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { useNotification } from '../../hooks/useNotification';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { $selectedCurrency } from '../../stores/currency.store';
import { useStore } from '@nanostores/react';

export const useCurrenciesGeneralsPage = () => {
    const showNotification = useNotification();
    const selectedCurrency = useStore($selectedCurrency);

    const getCurrencyItem = useCallback(
        async () => {
                try {
                    if (selectedCurrency?.id) {
                        const currencyItem = await getCurrency(selectedCurrency?.id);
                        $selectedCurrency.set(currencyItem);
                    }
                    
                } catch (error) {
                    showNotification('Не удалось получить валюту', 'error', error);
                }
            }, [selectedCurrency?.id, showNotification]
    );

    const editCurrencyItem = useCallback(
        async (body: any) => {
                try {
                    if (selectedCurrency?.id) {
                        await editCurrency(selectedCurrency?.id, body);
                        showNotification('Валюта успешно изменена', 'success',);
                        setTimeout(() => getCurrencyItem(), 1000);
                    }
                    
                } catch (error) {
                    showNotification('Не удалось изменить валюту', 'error', error);
                }
            }, [getCurrencyItem, selectedCurrency?.id, showNotification]
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


    React.useEffect(() => {
        getCurrencyItem();
    }, [getCurrencyCodeList]);

    React.useEffect(() => {
        getCurrencyCodeList();
        getPaymentSystemsList();
    }, [getCurrencyCodeList, getPaymentSystemsList]);


    return { editCurrencyItem };

};