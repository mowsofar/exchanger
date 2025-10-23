import React, { useCallback } from 'react';
import {
    getPayouts,
    searchPayouts,
    setPayoutStatus,
    updatePayoutRequisites,
    verifyPayoutRequisites,
} from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $payouts, $payoutsTotal, updatePayout } from '../../stores/payout.store';
import { PAYOUTS_PER_PAGE, PayoutStatus } from '../../api/types/common';
import { useSearchParams } from 'react-router-dom';

export const usePayoutsPage = () => {
    const showNotification = useNotification();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = Number(searchParams.get('page')) || 1;
    const initialSearch = searchParams.get('search') || '';

    const [page, setPage] = React.useState(initialPage);
    const [search, setSearch] = React.useState(initialSearch);
    const [isLoading, setIsLoading] = React.useState(true);

    // === Общая функция для загрузки списка ===
    const loadPayouts = useCallback(
        async (page: number, search?: string, statuses?: PayoutStatus[]) => {
            try {
                setIsLoading(true);

                const response = search
                    ? await searchPayouts(search, page - 1, PAYOUTS_PER_PAGE)
                    : await getPayouts(page - 1, PAYOUTS_PER_PAGE, statuses);

                $payouts.set(response.content);
                $payoutsTotal.set(response.totalElements);
            } catch (error) {
                showNotification('Ошибка получения списка заявок', 'error', error);
            } finally {
                setIsLoading(false);
            }
        },
        [showNotification],
    );

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);

            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set('search', value);
                params.set('page', '1');
            } else {
                params.delete('search');
            }

            setSearchParams(params);
            setPage(1);
            loadPayouts(1, value);
        },
        [searchParams, setSearchParams, loadPayouts],
    );

    const handleClickPage = useCallback(
        (newPage: number) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(newPage));
            setSearchParams(params);

            setPage(newPage);
            loadPayouts(newPage, search);
        },
        [searchParams, setSearchParams, loadPayouts, search],
    );

    React.useEffect(() => {
        const currentPage = Number(searchParams.get('page')) || 1;
        const currentSearch = searchParams.get('search') || '';

        setPage(currentPage);
        setSearch(currentSearch);
        loadPayouts(currentPage, currentSearch);
    }, [searchParams, loadPayouts]);

    const editPayoutStatus = useCallback(
        async (id: number, status: PayoutStatus) => {
            try {
                const selectedPayout = await setPayoutStatus(id, status);
                updatePayout(selectedPayout);
                showNotification('Статус заявки успешно обновлён', 'success');
                setTimeout(() => loadPayouts(page, search), 1000);
            } catch (error) {
                showNotification('Ошибка изменения статуса заявки', 'error', error);
            }
        },
        [loadPayouts, page, search, showNotification],
    );

    const setPayoutRequisites = useCallback(
        async (id: number, requisites: string) => {
            try {
                const selectedPayout = await updatePayoutRequisites(id, requisites);
                updatePayout(selectedPayout);
                showNotification('Реквизиты успешно сохранены', 'success');
            } catch (error) {
                showNotification('Ошибка сохранения реквизитов', 'error', error);
            }
        },
        [showNotification],
    );

    const verifyRequisites = useCallback(
        async (requisites: string) => {
            try {
                await verifyPayoutRequisites(requisites);
                showNotification('Реквизиты успешно верифицированы', 'success');
                setTimeout(() => loadPayouts(page, search), 1000);
            } catch (error) {
                showNotification('Ошибка верификации реквизитов', 'error', error);
            }
        },
        [loadPayouts, page, search, showNotification],
    );

    return {
        page,
        search,
        isLoading,
        handleClickPage,
        handleSearchChange,
        editPayoutStatus,
        setPayoutRequisites,
        verifyRequisites,
    };
};
