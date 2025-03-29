import React, { useCallback } from 'react';
import { getPayout, getPayouts, setPayoutStatus, updatePayoutRequisites } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts, $selectedPayout } from '../../stores/payout.store';
import { PayoutStatus } from '../../api/types/common';
import { useParams } from 'react-router-dom';

export const usePayoutPage = () => {
    const showNotification = useNotification();

    const { id = '' } = useParams();

    const getPayoutItem = useCallback(
        async () => {
                try {
                    const payoutItem = await getPayout(Number(id));
                    $selectedPayout.set(payoutItem);
                    
                } catch (error) {
                    showNotification('Не удалось загрузить заявку', 'error', error);
                }
            }, [id, showNotification]
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

    const editPayoutStatus = useCallback(
        async (id: number, status: PayoutStatus) => {
                try {
                    const selectedPayout = await setPayoutStatus(id, status);
                    showNotification('Статус заявки успешно обновлен', 'success');
                    $selectedPayout.set(selectedPayout);

                    setTimeout(() => {getPayoutItem(); getPayoutsList()}, 1000);

                } catch (error) {
                    showNotification('Ошибка измененя статуса заявки', 'error', error);
                }
            }, [getPayoutItem, getPayoutsList, showNotification]
    );

    const setPayoutRequisites = useCallback(
        async (id: number, requisites: string) => {
                try {
                    const selectedPayout = await updatePayoutRequisites(id, requisites);
                    showNotification('Реквизиты успешно сохранены', 'success');

                    $selectedPayout.set(selectedPayout);

                    setTimeout(() => {getPayoutItem(); getPayoutsList()}, 1000);

                } catch (error) {
                    showNotification('Ошибка сохранения реквизитов', 'error', error);
                }
            }, [getPayoutItem, getPayoutsList, showNotification]
    );

    React.useEffect(() => {
        getPayoutItem();
    }, [getPayoutItem]);

    return { editPayoutStatus, setPayoutRequisites };

};