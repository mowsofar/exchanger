import React, { useCallback } from 'react';
import { createAdditionalField, deleteAdditionalField, editAdditionalField, getAdditionalFields, getCurrencies, getExchangeDirections } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $additionalFields, $currencyList } from '../../stores/currency.store';
import { $exchangeDirectionsList } from '../../stores/exchangeDirections.store';
import { AdditionalFieldDirections } from '../../api/types/common';

export const useAdditionalFieldsPage = () => {
    const showNotification = useNotification();

    const getAdditionalFieldsList = useCallback(
        async () => {
                try {
                    const additionalFields = await getAdditionalFields();
                    $additionalFields.set(additionalFields);

                } catch (error) {
                    showNotification('Ошибка получения списка дополнительных полей', 'error', error);
                }
            }, [showNotification]
    );

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

    const createAdditionalFieldItem = useCallback(
        async (fieldName: string, status: string, direction: AdditionalFieldDirections, currencyIds: number[]) => {
                try {
                    await createAdditionalField(fieldName, status, direction, currencyIds);
                    showNotification('Дополнительное поле успешно создано', 'success');

                    setTimeout(() => getAdditionalFieldsList(), 1000);
                } catch (error) {
                    showNotification('Ошибка создания дополнительного поля', 'error', error);
                }
            }, [getAdditionalFieldsList, showNotification]
    );

    const editAdditionalFieldItem = useCallback(
        async (id: number, fieldName: string, status: string, direction: AdditionalFieldDirections, currencyIds: number[]) => {
                try {
                    await editAdditionalField(id, fieldName, status, direction, currencyIds);
                    showNotification('Дополнительное поле успешно изменено', 'success');

                    setTimeout(() => getAdditionalFieldsList(), 1000);
                } catch (error) {
                    showNotification('Ошибка редактирования дополнительного поля', 'error', error);
                }
            }, [getAdditionalFieldsList, showNotification]
    );

    const deleteAdditionalFieldItem = useCallback(
        async (id: number) => {
                try {
                    await deleteAdditionalField(id);
                    showNotification('Дополнительное поле успешно удалено', 'success');

                    setTimeout(() => getAdditionalFieldsList(), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления дополнительного поля', 'error', error);
                }
            }, [getAdditionalFieldsList, showNotification]
    );


    React.useEffect(() => {
        getAdditionalFieldsList();
    }, [getAdditionalFieldsList]);

    React.useEffect(() => {
        getExchangeDirectionsList();
    }, [getExchangeDirectionsList]);

    React.useEffect(() => {
        getCurrenciesList();
    }, [getCurrenciesList]);

    return { createAdditionalFieldItem, editAdditionalFieldItem, deleteAdditionalFieldItem };

};
