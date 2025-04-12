import React, { useCallback } from 'react';
import { createRequisites, deleteRequisites, editRequisites, getCurrencies, getRequisites } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $currencyList, $requisites } from '../../stores/currency.store';

export const useRequisitesPage = () => {
    const showNotification = useNotification();

    const [isLoading, setIsLoading] = React.useState(true);

    const getRequisitesList = useCallback(
        async () => {
                try {
                    setIsLoading(true);
                    const requisites = await getRequisites();
                    $requisites.set(requisites);

                } catch (error) {
                    showNotification('Ошибка получения списка реквизитов', 'error', error);
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

    const createRequiustesItem = useCallback(
        async (name: string, details: string, currencyIds: number[]) => {
                try {
                    await createRequisites(name, details, currencyIds);
                    showNotification('Реквизиты успешно созданы', 'success');

                    setTimeout(() => getRequisitesList(), 1000);
                } catch (error) {
                    showNotification('Ошибка создания реквизитов', 'error', error);
                }
            }, [getRequisitesList, showNotification]
    );

    const editRequiustesItem = useCallback(
        async (id: number, name: string, details: string, currencyIds: number[]) => {
                try {
                    await editRequisites(id, name, details, currencyIds);
                    showNotification('Реквизиты успешно изменены', 'success');

                    setTimeout(() => getRequisitesList(), 1000);
                } catch (error) {
                    showNotification('Ошибка редактирования реквизитов', 'error', error);
                }
            }, [getRequisitesList, showNotification]
    );

    const deleteRequisitesItem = useCallback(
        async (id: number) => {
                try {
                    await deleteRequisites(id);
                    showNotification('Реквизиты успешно удалены', 'success');

                    setTimeout(() => getRequisitesList(), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления реквизитов', 'error', error);
                }
            }, [getRequisitesList, showNotification]
    );


    React.useEffect(() => {
        getRequisitesList();
    }, [getRequisitesList]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);

    return { createRequiustesItem, editRequiustesItem, deleteRequisitesItem, isLoading };

};
