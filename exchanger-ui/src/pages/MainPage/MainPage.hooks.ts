import React from 'react';
import { getExchangeDirections, getExchangeDirectionsCourse, getLeftColumnCurrencies, getRightColumnCurrencies } from '../../api/handlers';
import { $amountFrom, $amountTo, $course, $exchangeDirection, $exchangeError, $sourceCurrencies, $sourceCurrency, $targetCurrencies, $targetCurrency } from '../../stores/currencies.store';
import { useStore } from '@nanostores/react';
import { Currency } from '../../api/types/common';
import { $email, $payout, $referralCode, $requisites } from '../../stores/payout.store';

export const useMainPage = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const tagretCurrency = useStore($targetCurrency);

    const [error, setError] = React.useState('');

    const getCurrencies = React.useCallback(async () => {
        $payout.set(null);
        const sourceCurrencies = await getLeftColumnCurrencies();
        $sourceCurrencies.set(sourceCurrencies);
        $sourceCurrency.set(sourceCurrencies[0]);

        const targetCurrencies = await getRightColumnCurrencies(sourceCurrencies[0].id);
        $targetCurrencies.set(targetCurrencies);
        $targetCurrency.set(targetCurrencies[0]);

        const exchangeDirections = await getExchangeDirections(sourceCurrencies[0].id, targetCurrencies[0].id);
        $exchangeDirection.set(exchangeDirections);
        $amountFrom.set(String(exchangeDirections.minSourceAmount));

        const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrencies[0].id, targetCurrencies[0].id);
        $course.set(exchangeDirectionsCourse);

        if (exchangeDirectionsCourse.isReversed) {
            $amountTo.set(String(exchangeDirectionsCourse.course / exchangeDirections.minSourceAmount));
        } else {
            $amountTo.set(String(exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount));
        }
    }, []);

    const getExchangeCourse = React.useCallback(async (sourceId: number, targetId: number) => {
        const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceId, targetId);
        $course.set(exchangeDirectionsCourse);

    }, []);

    const setSourceCurrency = React.useCallback(async (sourceCurrency: Currency) => {
        $exchangeError.set(false);
        setError('');
        const targetCurrencies = await getRightColumnCurrencies(sourceCurrency.id);
            $targetCurrencies.set(targetCurrencies);

            if (tagretCurrency && !targetCurrencies.includes(tagretCurrency)) {
                $targetCurrency.set(targetCurrencies[0]);
            }

            const exchangeDirections = await getExchangeDirections(sourceCurrency.id, targetCurrencies[0]?.id);
            $exchangeDirection.set(exchangeDirections);
                
            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrency.id, targetCurrencies[0]?.id);
            $course.set(exchangeDirectionsCourse);
            $amountFrom.set(String(exchangeDirections.minSourceAmount));

            if (exchangeDirectionsCourse.isReversed) {
                $amountTo.set(String(exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course));
            } else {
                $amountTo.set(String(exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount));
            }
    }, [tagretCurrency]);

    const setTargetCurrency = React.useCallback(async (tagretCurrency: Currency) => {
        $exchangeError.set(false);
        setError('');
        if (sourceCurrency) {
            const exchangeDirections = await getExchangeDirections(sourceCurrency?.id, tagretCurrency?.id);
            $exchangeDirection.set(exchangeDirections);

            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrency.id, tagretCurrency?.id);
            $course.set(exchangeDirectionsCourse);
            $amountFrom.set(String(exchangeDirections.minSourceAmount));

            if (exchangeDirectionsCourse.isReversed) {
                $amountTo.set(String(exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course));
            } else {
                $amountTo.set(String(exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount));
            }
        }

    }, [sourceCurrency]);

    const handleChangeCurrencies = React.useCallback(async (sourceCurrency: Currency, tagretCurrency: Currency) => {
        try {
            $exchangeError.set(false);
            const exchangeDirections = await getExchangeDirections(tagretCurrency?.id, sourceCurrency?.id);
            $sourceCurrency.set(tagretCurrency);
            $targetCurrency.set(sourceCurrency);
            $exchangeDirection.set(exchangeDirections);

            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(tagretCurrency.id, sourceCurrency?.id);
            $course.set(exchangeDirectionsCourse);
            $amountFrom.set(String(exchangeDirections.minSourceAmount));

            if (exchangeDirectionsCourse.isReversed) {
                $amountTo.set(String(exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course));
            } else {
                $amountTo.set(String(exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount));
            }
        } catch {
            setError('Выбранного направления не существует.')
        }
    }, []);

    React.useEffect(() => {
        getCurrencies()
    }, [getCurrencies]);

    React.useEffect(() => {
        return () => {
            $payout.set(null);
            $email.set('');
            $referralCode.set('');
            $requisites.set('');
            setError('');
        };
    }, []);


    return {
        getExchangeCourse, setSourceCurrency, setTargetCurrency, handleChangeCurrencies, error, setError
    };
};
