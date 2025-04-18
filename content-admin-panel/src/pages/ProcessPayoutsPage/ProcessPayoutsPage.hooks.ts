import React, { useCallback } from 'react';
import { getPayouts, setPayoutStatus, updatePayoutRequisites, verifyPayoutRequisites } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts, $payoutsTotal, updatePayout } from '../../stores/payout.store';
import { PAYOUTS_PER_PAGE, PayoutStatus } from '../../api/types/common';
import { useSearchParams } from 'react-router-dom';

export const useProcessPayoutsPage = () => {
    const showNotification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = new URLSearchParams(window.location.search).get('page');

    const [page, setPage] = React.useState(Number(initialPage) || 1);
    const [isLoading, setIsLoading] = React.useState(true);
    
    const getPayoutsList = useCallback(
        async (page: number) => {
                try {
                    setIsLoading(true);
                    const payouts = await getPayouts(page - 1, PAYOUTS_PER_PAGE, ['WAITING_FOR_CLIENT_PAYMENT', 'PAYMENT_RECEIVED']);
                    $payouts.set(payouts.content);
                    $payoutsTotal.set(payouts.totalElements)
                } catch (error) {
                    showNotification('Ошибка получения списка заявок', 'error', error);
                } finally {
                    setIsLoading(false);
                }
            }, [showNotification]
    );  

    const editPayoutStatus = useCallback(
        async (id: number, status: PayoutStatus) => {
                try {
                    const selectedPayout = await setPayoutStatus(id, status);
                    showNotification('Статус заявки успешно обновлен', 'success');
                    updatePayout(selectedPayout);

                } catch (error) {
                    showNotification('Ошибка измененя статуса заявки', 'error', error);
                }
            }, [showNotification]
    );

    const setPayoutRequisites = useCallback(
        async (id: number, requisites: string) => {
                try {
                    const selectedPayout = await updatePayoutRequisites(id, requisites);
                    showNotification('Реквизиты успешно сохранены', 'success');

                    updatePayout(selectedPayout);

                } catch (error) {
                    showNotification('Ошибка сохранения реквизитов', 'error', error);
                }
            }, [showNotification]
    );

    const verifyRequisites = useCallback(
        async (requisites: string) => {
                try {
                    await verifyPayoutRequisites(requisites);
                    showNotification('Реквизиты успешно верифицированы', 'success');

                    setTimeout(() => getPayoutsList(page), 1000);
                } catch (error) {
                    showNotification('Ошибка верификации реквизитов', 'error', error);
                }
            }, [getPayoutsList, page, showNotification]
    );

    const handleClickPage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        setSearchParams(params);

        getPayoutsList(page);
        setPage(page);
    };

    React.useEffect(() => {
            getPayoutsList(page);
        }    
    , [getPayoutsList, page]);

    return { page, handleClickPage, isLoading, editPayoutStatus, setPayoutRequisites, verifyRequisites };
};
