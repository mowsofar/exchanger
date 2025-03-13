import React, { useCallback } from 'react';
import { createExchangeDirection, deleteExchangeDirection, editExchangeDirection, getCurrencies, getExchangeDirections } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $exchangeDirectionsList } from '../../stores/exchangeDirections.store';
import { $currencyList } from '../../stores/currency.store';

export const useExchangeDirectionsPage = () => {
    const showNotification = useNotification();

    const getExchangeDirectionsList = useCallback(
        async () => {
                try {
                    const exchangeDirections = await getExchangeDirections();
                    $exchangeDirectionsList.set(exchangeDirections);

                } catch (error) {
                    showNotification('Ошибка получения списка направлений обмена', 'error', error);
                }
            }, [showNotification]
    );
    
    const createExchangeDirectionItem = useCallback(
        async (sourceCurrencyId: number, targetCurrencyId: number, profitPercent: number, minSourceAmount: number, maxSourceAmount: number, reserves: number) => {
                try {
                    await createExchangeDirection(sourceCurrencyId, targetCurrencyId, profitPercent, minSourceAmount, maxSourceAmount, reserves);
                    showNotification('Направление обмена успешно создано', 'success');

                    setTimeout(() => getExchangeDirectionsList(), 1000);
                } catch (error) {
                    showNotification('Не удалось создать направление обмена', 'error', error);
                }
            }, [getExchangeDirectionsList, showNotification]
    );

    const editExchangeDirectionItem = useCallback(
        async (id: number, body: any) => {
                try {
                    await editExchangeDirection(id, body);
                    showNotification('Направление обмена успешно отредактировано', 'success');

                    setTimeout(() => getExchangeDirectionsList(), 1000);
                } catch (error) {
                    showNotification('Не удалось отредактировать направление обмена', 'error', error);
                }
            }, [getExchangeDirectionsList, showNotification]
    );

    const deleteExchangeDirectionItem = useCallback(
        async (id: number) => {
                try {
                    await deleteExchangeDirection(id);
                    showNotification('Направление обмена успешно удалено', 'success');

                    setTimeout(() => getExchangeDirectionsList(), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления направления обмена', 'error', error);
                }
            }, [getExchangeDirectionsList, showNotification]
    );

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
    

    React.useEffect(() => {
        getExchangeDirectionsList();
    }, [getExchangeDirectionsList]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);


    return { createExchangeDirectionItem, editExchangeDirectionItem, deleteExchangeDirectionItem };

};
