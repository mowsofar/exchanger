import React, { useCallback } from 'react';
import { createPaymentSystem, deletePaymentSystem, editPaymentSystem, getPaymentSystems } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';

export const usePaymentSystemsPage = () => {
    const showNotification = useNotification();
    
    const getPaymentSystemsList = useCallback(
        async () => {
                try {
                    const paymentSystems = await getPaymentSystems();
                    $paymentSystemsList.set(paymentSystems);

                } catch (error) {
                    showNotification('Не удалось получить список платёжный систем', 'error', error);
                }
            }, [showNotification]
    );

    const createPaymentSystemItem = useCallback(
        async (name: string, file: File) => {
                try {
                    const formData = new FormData();
                    formData.append("file", file)

                    await createPaymentSystem(name, formData);
                    showNotification('Платёжная система успешно создана', 'success');
                    setTimeout(() => getPaymentSystemsList(), 1000);;

                } catch (error) {
                    showNotification('Не удалось создать платёжную систему', 'error', error);
                }
            }, [getPaymentSystemsList, showNotification]
    );

    const editPaymentSystemItem = useCallback(
        async (id: number, name: string, file?: File) => {
                try {
                    const formData = new FormData();
                    if (file) {
                        formData.append("file", file);
                    }

                    await editPaymentSystem(id, name, formData);
                    showNotification('Платёжная система успешно изменена', 'success');
                    setTimeout(() => getPaymentSystemsList(), 1000);;

                } catch (error) {
                    showNotification('Не удалось изменить платёжную систему', 'error', error);
                }
            }, [getPaymentSystemsList, showNotification]
    );

    const deletePaymentSystemItem = useCallback(
        async (id: number) => {
                try {
                    await deletePaymentSystem(id);
                    showNotification('Платёжная система успешно удалена', 'success');
                    setTimeout(() => getPaymentSystemsList(), 1000);;

                } catch (error) {
                    showNotification('Не удалось удалить платёжную систему', 'error', error);
                }
            }, [getPaymentSystemsList, showNotification]
    );

    React.useEffect(() => {
        getPaymentSystemsList();
    }, [getPaymentSystemsList]);

    return { createPaymentSystemItem, deletePaymentSystemItem, editPaymentSystemItem };

};
