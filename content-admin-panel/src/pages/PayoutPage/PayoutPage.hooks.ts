import React, { useCallback } from 'react';
import { getCurrencies, getPayout, getPayouts, setPayoutStatus } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts, $selectedPayout } from '../../stores/payout.store';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { PayoutStatus } from '../../api/types/common';

export const usePayoutPage = () => {
    const showNotification = useNotification();
    const selectedPayout = useStore($selectedPayout);

    const getPayoutItem = useCallback(
        async () => {
                try {
                    if (selectedPayout?.id) {
                        const payoutItem = await getPayout(selectedPayout.id);
                        $selectedPayout.set(payoutItem);
                    }
                    
                } catch (error) {
                    showNotification('Не удалось загрузить заявку', 'error', error);
                }
            }, [selectedPayout?.id, showNotification]
    );

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

    const editPayoutStatus = useCallback(
        async (id: number, status: PayoutStatus) => {
                try {
                    const selectedPayout = await setPayoutStatus(id, status);
                    $selectedPayout.set(selectedPayout);

                    setTimeout(() => {getPayoutItem(); getPayoutsList()}, 1000);

                } catch (error) {
                    showNotification('Ошибка измененя статуса заявки', 'error', error);
                }
            }, [getPayoutItem, getPayoutsList, showNotification]
    );

    React.useEffect(() => {
        getPayoutItem();
    }, [getPayoutItem]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);


    return { editPayoutStatus };

};