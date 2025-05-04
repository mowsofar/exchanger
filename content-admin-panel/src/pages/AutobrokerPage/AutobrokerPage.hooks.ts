import React, { useCallback } from 'react';
import { createAutobroker, deleteAutobroker, editAutobroker, getAutobrokers, getExchangeDirections } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $autobrokers } from '../../stores/currency.store';
import { $exchangeDirections } from '../../stores/exchangeDirections.store';

export const useAutobrokerPage = () => {
    const showNotification = useNotification();

    const [isLoading, setIsLoading] = React.useState(true);

    const getAutobrokersList = useCallback(
        async () => {
                try {
                    setIsLoading(true);
                    const autobrokers = await getAutobrokers();
                    $autobrokers.set(autobrokers);

                } catch (error) {
                    showNotification('Ошибка получения списка автоброкеров', 'error', error);
                } finally {
                    setIsLoading(false);
                }
            }, [showNotification]
    );

    const getExchangeDirectionsList = useCallback(
        async () => {
                try {
                    const exchangeDirections = await getExchangeDirections();
                    $exchangeDirections.set(exchangeDirections);

                } catch (error) {}
            }, []
    );

    const createAutobrokerItem = useCallback(
        async (minCourse: number, exchangeDirectionId: number, position: number) => {
                try {
                    await createAutobroker('ACTIVE', minCourse, exchangeDirectionId, position);
                    showNotification('Автоброкер успешно создан', 'success');

                    setTimeout(() => getAutobrokersList(), 1000);
                } catch (error) {
                    showNotification('Ошибка создания автоброкера', 'error', error);
                }
            }, [getAutobrokersList, showNotification]
    );

    const editAutobrokerItem = useCallback(
        async (id: number, body: any) => {
                try {
                    await editAutobroker(id, body);
                    showNotification('Автоброкер успешно изменён', 'success');

                    setTimeout(() => getAutobrokersList(), 1000);
                } catch (error) {
                    showNotification('Ошибка редактирования автоброкера', 'error', error);
                }
            }, [getAutobrokersList, showNotification]
    );

    const deleteAutobrokerItem = useCallback(
        async (id: number) => {
                try {
                    await deleteAutobroker(id);
                    showNotification('Автоброкер успешно удалён', 'success');

                    setTimeout(() => getAutobrokersList(), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления автоброкера', 'error', error);
                }
            }, [getAutobrokersList, showNotification]
    );

    React.useEffect(() => {
        getAutobrokersList();
    }, [getAutobrokersList]);

    React.useEffect(() => {
        getExchangeDirectionsList();
    }, [getExchangeDirectionsList]);

    return { createAutobrokerItem, editAutobrokerItem, deleteAutobrokerItem, isLoading };

};
