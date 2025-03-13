import React, { useCallback } from 'react';
import { getCurrencies, getPayouts, getPayoutsByFilter } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts } from '../../stores/payout.store';
import { $currencyList } from '../../stores/currency.store';

export const usePayoutsPage = () => {
    const showNotification = useNotification();

    const getPayoutsList = useCallback(
        async () => {
                try {
                    const payouts = await getPayouts();
                    $payouts.set(payouts);
                } catch (error) {
                    showNotification('Ошибка получения списка заявок', 'error', error);
                }
            }, [showNotification]
    );
    
    const getPayoutsByType = useCallback(
        async (status: string) => {
                try {
                    const payouts = await getPayoutsByFilter(status);
                    $payouts.set(payouts);
                } catch (error) {
                    showNotification('Ошибка получения списка заявок', 'error', error);
                }
            }, [showNotification]
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
        getPayoutsList();
    }, [getPayoutsList]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);

    return { getPayoutsList, getPayoutsByType };

};
