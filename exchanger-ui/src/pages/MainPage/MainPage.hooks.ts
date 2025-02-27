import React from 'react';
import { getExchangeDirections, getExchangeDirectionsCourse, getLeftColumnCurrencies, getRightColumnCurrencies } from '../../api/handlers';
import { $amountFrom, $course, $exchangeDirections, $sourceCurrencies, $sourceCurrency, $targetCurrencies, $targetCurrency } from '../../stores/currencies.store';
import { useStore } from '@nanostores/react';
import { Currency } from '../../api/types/common';

export const useMainPage = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const tagretCurrency = useStore($targetCurrency);

    const getCurrencies = React.useCallback(async () => {
        const sourceCurrencies = await getLeftColumnCurrencies();
        $sourceCurrencies.set(sourceCurrencies);
        $sourceCurrency.set(sourceCurrencies[0]);

        const targetCurrencies = await getRightColumnCurrencies(sourceCurrencies[0].id);
        $targetCurrencies.set(targetCurrencies);
        $targetCurrency.set(targetCurrencies[0]);

        const exchangeDirections = await getExchangeDirections(sourceCurrencies[0].id, targetCurrencies[0].id);
        $exchangeDirections.set(exchangeDirections);
        $amountFrom.set(exchangeDirections.minSourceAmount);

        const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrencies[0].id, targetCurrencies[0].id);
        $course.set(exchangeDirectionsCourse);

    }, []);

    const getExchangeCourse = React.useCallback(async (sourceId: number, targetId: number) => {
        const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceId, targetId);
        $course.set(exchangeDirectionsCourse);

    }, []);

    const setSourceCurrency = React.useCallback(async (sourceCurrency: Currency) => {
        const targetCurrencies = await getRightColumnCurrencies(sourceCurrency.id);
            $targetCurrencies.set(targetCurrencies);

            if (tagretCurrency && !targetCurrencies.includes(tagretCurrency)) {
                $targetCurrency.set(targetCurrencies[0]);
            }

            const exchangeDirections = await getExchangeDirections(sourceCurrency.id, targetCurrencies[0]?.id);
            $exchangeDirections.set(exchangeDirections);
                
            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrency.id, targetCurrencies[0]?.id);
            $course.set(exchangeDirectionsCourse);
            $amountFrom.set(exchangeDirections.minSourceAmount);
    }, [tagretCurrency])

    React.useEffect(() => {getCurrencies()}, [getCurrencies]);

    return {
        getExchangeCourse, setSourceCurrency
    };
};
