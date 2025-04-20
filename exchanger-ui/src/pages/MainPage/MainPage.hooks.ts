import React from 'react';
import { getExchangeDirections, getExchangeDirectionsCourse, getLeftColumnCurrencies, getRightColumnCurrencies } from '../../api/handlers';
import { $amountFrom, $amountTo, $course, $exchangeDirection, $exchangeError, $sourceCurrencies, $sourceCurrency, $targetCurrencies, $targetCurrency } from '../../stores/currencies.store';
import { useStore } from '@nanostores/react';
import { Currency } from '../../api/types/common';
import { $email, $payout, $requisites } from '../../stores/payout.store';
import { formatNumberWithDecimalPlaces, formatToSubmit } from '../../utils/formatNumber';

export const useMainPage = () => {
    const tagretCurrency = useStore($targetCurrency);
    const sourceAmount = useStore($amountFrom);

    const [error, setError] = React.useState('');

    const getCurrencies = React.useCallback(async () => {
        try {
            $payout.set(null);
            const sourceCurrencies = await getLeftColumnCurrencies();
            $sourceCurrencies.set(sourceCurrencies);
            $sourceCurrency.set(sourceCurrencies[0]);
    
            const targetCurrencies = await getRightColumnCurrencies(sourceCurrencies[0].id);
            $targetCurrencies.set(targetCurrencies);
            $targetCurrency.set(targetCurrencies[0]);
    
            const exchangeDirections = await getExchangeDirections(sourceCurrencies[0].id, targetCurrencies[0].id);
            $exchangeDirection.set(exchangeDirections);
            $amountFrom.set(
                formatNumberWithDecimalPlaces(
                    exchangeDirections.minSourceAmount,
                    sourceCurrencies[0].decimalPlaces
                )
            );
    
            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrencies[0].id, targetCurrencies[0].id);
            $course.set(exchangeDirectionsCourse);

            let calculatedAmount: number;

            if (exchangeDirectionsCourse.isReversed) {
                calculatedAmount = exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course;
            } else {
                calculatedAmount = exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount;
            }
        
            // Используем decimalPlaces для форматирования
            $amountTo.set(
                formatNumberWithDecimalPlaces(
                calculatedAmount,
                targetCurrencies[0].decimalPlaces
                )
            );
        } catch {}
    }, []);

    const getExchangeCourse = React.useCallback(async (sourceId: number, targetId: number) => {
        try {
            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceId, targetId);
            $course.set(exchangeDirectionsCourse);

            if (!formatToSubmit(sourceAmount)) return;

            let calculatedAmount: number;
            if (exchangeDirectionsCourse.isReversed) {
                calculatedAmount = formatToSubmit(sourceAmount) / exchangeDirectionsCourse.course;
            } else {
                calculatedAmount = exchangeDirectionsCourse.course * formatToSubmit(sourceAmount);
            }
        
            // Используем decimalPlaces целевой валюты для форматирования
            const targetCurrency = $targetCurrency.get();
            $amountTo.set(
                formatNumberWithDecimalPlaces(
                    calculatedAmount,
                    targetCurrency?.decimalPlaces
                )
            );
    } catch {}       
    }, [sourceAmount]);

    const setSourceCurrency = React.useCallback(async (sourceCurrency: Currency) => {
        try {
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
            
            // Используем decimalPlaces исходной валюты
            $amountFrom.set(
                formatNumberWithDecimalPlaces(
                    exchangeDirections.minSourceAmount,
                    sourceCurrency.decimalPlaces
                )
            );
    
            let calculatedAmount: number;
            if (exchangeDirectionsCourse.isReversed) {
                calculatedAmount = exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course;
            } else {
                calculatedAmount = exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount;
            }
            
            // Используем decimalPlaces целевой валюты
            $amountTo.set(
                formatNumberWithDecimalPlaces(
                    calculatedAmount,
                    targetCurrencies[0]?.decimalPlaces
                )
            );
        } catch {}
    }, [tagretCurrency]);

    const setTargetCurrency = React.useCallback(async (tagretCurrency: Currency) => {
        try {
            $exchangeError.set(false);
            setError('');
            const sourceCurrency = $sourceCurrency.get();

            if (sourceCurrency) {
                const exchangeDirections = await getExchangeDirections(sourceCurrency.id, tagretCurrency.id);
                $exchangeDirection.set(exchangeDirections);
    
                const exchangeDirectionsCourse = await getExchangeDirectionsCourse(sourceCurrency.id, tagretCurrency.id);
                $course.set(exchangeDirectionsCourse);
                
                // Используем decimalPlaces исходной валюты
                $amountFrom.set(
                    formatNumberWithDecimalPlaces(
                        exchangeDirections.minSourceAmount,
                        sourceCurrency.decimalPlaces
                    )
                );
    
                let calculatedAmount: number;
                if (exchangeDirectionsCourse.isReversed) {
                    calculatedAmount = exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course;
                } else {
                    calculatedAmount = exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount;
                }
                
                // Используем decimalPlaces целевой валюты
                $amountTo.set(
                    formatNumberWithDecimalPlaces(
                        calculatedAmount,
                        tagretCurrency.decimalPlaces
                    )
                );
            }
        } catch {}
    }, []);

    const handleChangeCurrencies = React.useCallback(async (sourceCurrency: Currency, tagretCurrency: Currency) => {
        try {
            const targetCurrencies = await getRightColumnCurrencies(tagretCurrency.id);
            $targetCurrencies.set(targetCurrencies);
    
            $sourceCurrency.set(sourceCurrency);
            $targetCurrency.set(tagretCurrency);
    
            $exchangeError.set(false);
            const exchangeDirections = await getExchangeDirections(tagretCurrency.id, sourceCurrency.id);
            $sourceCurrency.set(tagretCurrency);
            $targetCurrency.set(sourceCurrency);
            $exchangeDirection.set(exchangeDirections);
    
            const exchangeDirectionsCourse = await getExchangeDirectionsCourse(tagretCurrency.id, sourceCurrency.id);
            $course.set(exchangeDirectionsCourse);
            
            // Используем decimalPlaces новой исходной валюты (бывшей целевой)
            $amountFrom.set(
                formatNumberWithDecimalPlaces(
                    exchangeDirections.minSourceAmount,
                    tagretCurrency.decimalPlaces
                )
            );
    
            let calculatedAmount: number;
            if (exchangeDirectionsCourse.isReversed) {
                calculatedAmount = exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course;
            } else {
                calculatedAmount = exchangeDirectionsCourse.course * exchangeDirections.minSourceAmount;
            }
            
            // Используем decimalPlaces новой целевой валюты (бывшей исходной)
            $amountTo.set(
                formatNumberWithDecimalPlaces(
                    calculatedAmount,
                    sourceCurrency.decimalPlaces
                )
            );
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
            $requisites.set('');
            setError('');
        };
    }, []);


    return {
        getExchangeCourse, setSourceCurrency, setTargetCurrency, handleChangeCurrencies, error, setError
    };
};
