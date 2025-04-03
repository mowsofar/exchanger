import React, { useCallback } from 'react';
import { getCurrencies, getPayouts, getPayoutsByFilter } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts } from '../../stores/payout.store';
import { $currencyList } from '../../stores/currency.store';

export const usePayoutsPage = () => {
    const showNotification = useNotification();
    const [isLoading, setIsLoading] = React.useState(false);

    const initialType = new URLSearchParams(window.location.search).get('type');

    const getPayoutsList = useCallback(
        async () => {
                try {
                    setIsLoading(true);
                    const payouts = await getPayouts();
                    $payouts.set(payouts);
                } catch (error) {
                    showNotification('Ошибка получения списка заявок', 'error', error);
                } finally {
                    setIsLoading(false);
                }
            }, [showNotification]
    );
    
    const getPayoutsByType = useCallback(
        async (status: string) => {
                try {
                    setIsLoading(true);
                    const payouts = await getPayoutsByFilter(status);
                    $payouts.set(payouts);
                } catch (error) {
                    showNotification('Ошибка получения списка заявок', 'error', error);
                } finally {
                    setIsLoading(false);
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
        if (initialType) {
            getPayoutsByType(initialType);
        } else {
            getPayoutsList();
        }    
    }, [getPayoutsByType, getPayoutsList, initialType]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);

    return { getPayoutsList, getPayoutsByType, isLoading };

};
