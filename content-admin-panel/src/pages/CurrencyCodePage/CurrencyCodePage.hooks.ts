import React, { useCallback } from 'react';
import { createCurrencyCode, deleteCurrencyCode, editCurrencyCode, getCurrencyCodes } from '../../api/handlers';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { useNotification } from '../../hooks/useNotification';

export const useCurrencyCodePage = () => {
    const showNotification = useNotification();
    
    const getCurrencyCodeList = useCallback(
        async () => {
                try {
                    const currencyCodes = await getCurrencyCodes();
                    $currencyCodeList.set(currencyCodes);

                } catch (error) {
                    showNotification('Не удалось получить список кодов валют', 'error', error);
                }
            }, [showNotification]
    );

    const createCurrencyCodeItem = useCallback( 
        async (code: string, symbol: string) => {
                try {
                    await createCurrencyCode(code, symbol);
                    showNotification('Код валюты успешно создан', 'success');
                    setTimeout(() => getCurrencyCodeList(), 1000);
                } catch (error) {
                    showNotification('Не удалось создать новый код валюты', 'error', error);
                }
            }, [getCurrencyCodeList, showNotification]
    );

    const deleteCurrencyCodeItem = useCallback( 
        async (id: number) => {
                try {
                    await deleteCurrencyCode(id);
                    showNotification('Код валюты успешно удален', 'success');
                    setTimeout(() => getCurrencyCodeList(), 1000);
                } catch (error) {
                    showNotification('Ошибка удаления кода валюты', 'error', error);
                }
            }, [getCurrencyCodeList, showNotification]
    );

    const editCurrencyCodeItem = useCallback( 
        async (id: number, code: string, symbol: string) => {
                try {
                    await editCurrencyCode(id, code, symbol);
                    showNotification('Код валюты успешно изменён', 'success');
                    setTimeout(() => getCurrencyCodeList(), 1000);
                } catch (error) {
                    showNotification('Ошибка редактирования кода валюты', 'error', error);
                }
            }, [getCurrencyCodeList, showNotification]
    );


    React.useEffect(() => {
        getCurrencyCodeList();
    }, [getCurrencyCodeList]);

    return { createCurrencyCodeItem, deleteCurrencyCodeItem, editCurrencyCodeItem };

};
