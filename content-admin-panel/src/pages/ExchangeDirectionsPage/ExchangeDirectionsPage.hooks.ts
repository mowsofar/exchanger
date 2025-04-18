import React, { useCallback } from 'react';
import { createExchangeDirection, deleteExchangeDirection, editExchangeDirection, getCurrencies, getExchangeDirectionsPaged } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $exchangeDirectionsPaged, $exchangeDirectionsTotal } from '../../stores/exchangeDirections.store';
import { $currencyList } from '../../stores/currency.store';
import { DIRECTIONS_PER_PAGE } from '../../api/types/common';

export const useExchangeDirectionsPage = () => {
    const showNotification = useNotification();
    const [exchangeDirectionsPage, setExchangeDirectionsPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    const getExchangeDirectionsListPaged = useCallback(
        async (page: number) => {
                try {
                    setIsLoading(true);
                    const exchangeDirections = await getExchangeDirectionsPaged(page, DIRECTIONS_PER_PAGE);
                    $exchangeDirectionsPaged.set(exchangeDirections.content);
                    $exchangeDirectionsTotal.set(exchangeDirections.totalElements);

                } catch (error) {
                    $exchangeDirectionsPaged.set([]);
                    showNotification('Ошибка получения списка направлений обмена', 'error', error);
                } finally {
                    setIsLoading(false);
                }
            }, [showNotification]
    );
    
    const createExchangeDirectionItem = useCallback(
        async (sourceCurrencyId: number, targetCurrencyId: number, profitPercent: number, minSourceAmount: number, maxSourceAmount: number, reserves: number) => {
                try {
                    await createExchangeDirection(sourceCurrencyId, targetCurrencyId, profitPercent, minSourceAmount, maxSourceAmount, reserves);
                    showNotification('Направление обмена успешно создано', 'success');

                    setTimeout(() => getExchangeDirectionsListPaged(exchangeDirectionsPage), 1000);
                } catch (error) {
                    showNotification('Не удалось создать направление обмена', 'error', error);
                }
            }, [exchangeDirectionsPage, getExchangeDirectionsListPaged, showNotification]
    );

    const editExchangeDirectionItem = useCallback(
        async (id: number, body: any) => {
                try {
                    await editExchangeDirection(id, body);
                    showNotification('Направление обмена успешно отредактировано', 'success');

                    setTimeout(() => getExchangeDirectionsListPaged(exchangeDirectionsPage), 1000);
                } catch (error) {
                    showNotification('Не удалось отредактировать направление обмена', 'error', error);
                }
            }, [exchangeDirectionsPage, getExchangeDirectionsListPaged, showNotification]
    );

    const deleteExchangeDirectionItem = useCallback(
        async (id: number) => {
                try {
                    await deleteExchangeDirection(id);
                    showNotification('Направление обмена успешно удалено', 'success');

                    setTimeout(() => getExchangeDirectionsListPaged(exchangeDirectionsPage), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления направления обмена', 'error', error);
                }
            }, [exchangeDirectionsPage, getExchangeDirectionsListPaged, showNotification]
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

    const handleClickPage = (page: number) => {
        getExchangeDirectionsListPaged(page);
        setExchangeDirectionsPage(page);
    };

    React.useEffect(() => {
        getExchangeDirectionsListPaged(exchangeDirectionsPage);
    }, [exchangeDirectionsPage, getExchangeDirectionsListPaged]);


    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);


    return { getExchangeDirectionsListPaged, exchangeDirectionsPage, handleClickPage, createExchangeDirectionItem, editExchangeDirectionItem, deleteExchangeDirectionItem, isLoading };

};
