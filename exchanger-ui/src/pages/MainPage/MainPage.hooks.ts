import React from 'react';
import { getAccount, getExchangeDirections, getExchangeDirectionsCourse, getLeftColumnCurrencies, getRightColumnCurrencies, getTechStatus, getXmlExchangeDirections } from '../../api/handlers';
import { $amountFrom, $amountTo, $course, $exchangeDirection, $exchangeError, $sourceCurrencies, $sourceCurrency, $targetCurrencies, $targetCurrency } from '../../stores/currencies.store';
import { useStore } from '@nanostores/react';
import { Course, Currency, ExchangeDirection } from '../../api/types/common';
import { $email, $payout, $requisites } from '../../stores/payout.store';
import { formatNumberWithDecimalPlaces, formatToSubmit } from '../../utils/formatNumber';
import { logoutUser } from '../../api/tokenHandlers';
import { $technicalMode } from '../../stores/user.store';
import { useInterval } from '../../hooks/useInterval';

export const useMainPage = () => {
    const tagretCurrency = useStore($targetCurrency);
    const sourceAmount = useStore($amountFrom);

    const [isLoading, setIsLoading] = React.useState(true);
    const [isLoadingTargetCurrency, setIsLoadingTargetCurrency] = React.useState(false);
    const [error, setError] = React.useState('');

    const parseUrlParams = () => {
        if (typeof window === 'undefined') return null;
        
        const urlParams = new URLSearchParams(window.location.search);
        const from = urlParams.get('cur_from');
        const to = urlParams.get('cur_to');
        const ref = urlParams.get('ref');
        
        return { from, to, ref };
      };

    const getTechnicalStatus = React.useCallback(async () => {
        try {
            const technicalStatus = await getTechStatus();
            $technicalMode.set(technicalStatus.maintenance);
        } catch {}
      }, [])

    const getAccountInfo = React.useCallback(async () => {
        try {
            await getAccount();
        } catch {}
    }, []);

    const getCurrencies = React.useCallback(() => {
        $payout.set(null);
        setIsLoading(true);
        
        getLeftColumnCurrencies()
            .then(sourceCurrencies => {
                $sourceCurrencies.set(sourceCurrencies);
                if (!sourceCurrencies.length) return;
    
                const urlParams = parseUrlParams();
                const { ref, from, to } = urlParams || {};
                
                let initialSource = sourceCurrencies[0];
                let initialTarget: Currency | null = null;
    
                const getTargetCurrencies = (sourceId: number) => {
                    return getRightColumnCurrencies(sourceId).then(targets => {
                        $targetCurrencies.set(targets);
                        return targets;
                    });
                };
    
                // Определяем source валюту (из параметра или первую из списка)
                if (from) {
                    initialSource = sourceCurrencies.find(c => c.xmlCode === from) || initialSource;
                }
    
                return getTargetCurrencies(initialSource.id).then(async targetCurrencies => {
                    // Определяем target валюту (из параметра или первую из списка)
                    if (to) {
                        initialTarget = targetCurrencies.find(c => c.xmlCode === to) || targetCurrencies[0];
                    } else {
                        initialTarget = targetCurrencies[0];
                    }
    
                    let exchangeDirections: ExchangeDirection;
                    let exchangeDirectionsCourse: Course;
    
                    // Если есть ref, используем реферальный поток (даже если нет from/to)
                    if (ref) {
                        const effectiveFrom = from || initialSource.xmlCode;
                        const effectiveTo = to || initialTarget.xmlCode;
                        
                        const [direction] = await getXmlExchangeDirections(effectiveFrom, effectiveTo, ref);
                        exchangeDirections = direction;
                    } 
                    // Обычный поток (без ref)
                    else {
                        exchangeDirections = await getExchangeDirections(initialSource.id, initialTarget.id);
                    }
    
                    // Получаем курс в любом случае
                    exchangeDirectionsCourse = await getExchangeDirectionsCourse(
                        initialSource.id,
                        initialTarget.id
                    );
    
                    return {
                        exchangeDirections,
                        exchangeDirectionsCourse,
                        initialSource,
                        initialTarget
                    };
                });
            })
            .then(result => {
                if (!result || !result.initialTarget) return;
                
                const { exchangeDirections, exchangeDirectionsCourse, initialSource, initialTarget } = result;
                
                // Устанавливаем все состояния
                $sourceCurrency.set(initialSource);
                $targetCurrency.set(initialTarget);
                $exchangeDirection.set(exchangeDirections);
                $course.set(exchangeDirectionsCourse);
    
                // Форматируем суммы
                const formatAmount = (value: number, decimals: number) => 
                    formatNumberWithDecimalPlaces(value, decimals);
    
                const minAmount = formatAmount(
                    exchangeDirections.minSourceAmount,
                    initialSource.decimalPlaces
                );
                $amountFrom.set(minAmount);
    
                const calculatedAmount = exchangeDirectionsCourse.isReversed
                    ? exchangeDirections.minSourceAmount / exchangeDirectionsCourse.course
                    : exchangeDirections.minSourceAmount * exchangeDirectionsCourse.course;
    
                $amountTo.set(formatAmount(calculatedAmount, initialTarget.decimalPlaces));
            })
            .catch(error => {
                console.error('Error in getCurrencies:', error);
            })
            .finally(() => setIsLoading(false));
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
            setIsLoadingTargetCurrency(true);
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
        } catch {} finally {
            setIsLoadingTargetCurrency(false);
        }
    }, [tagretCurrency]);

    const setTargetCurrency = React.useCallback(async (tagretCurrency: Currency) => {
        try {
            setIsLoading(true);

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
        } catch {} finally {
            setIsLoading(false);
        }
    }, []);

    const handleChangeCurrencies = React.useCallback((sourceCurrency: Currency, tagretCurrency: Currency) => {
        setIsLoading(true);

        Promise.all([
            getRightColumnCurrencies(tagretCurrency.id),
            getExchangeDirections(tagretCurrency.id, sourceCurrency.id),
            getExchangeDirectionsCourse(tagretCurrency.id, sourceCurrency.id)
        ])
        .then(([targetCurrencies, exchangeDirections, exchangeDirectionsCourse]) => {
            $targetCurrencies.set(targetCurrencies);
            $sourceCurrency.set(tagretCurrency);  // Меняем местами валюты
            $targetCurrency.set(sourceCurrency);
            $exchangeError.set(false);
            $exchangeDirection.set(exchangeDirections);
            $course.set(exchangeDirectionsCourse);
    
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
    
            $amountTo.set(
                formatNumberWithDecimalPlaces(
                    calculatedAmount,
                    sourceCurrency.decimalPlaces
                )
            );
        })
        .catch(() => {
            setError('Выбранного направления не существует.');
        }).finally(() => setIsLoading(false));
    }, []);

    React.useEffect(() => {
        getCurrencies();
    }, [getCurrencies]);

    React.useEffect(() => {
        getTechnicalStatus();
    }, [getTechnicalStatus]);

    useInterval(
        () => {
            getTechnicalStatus();
        },
        30000,
        [getTechnicalStatus],
    );


    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
            logoutUser();
            return;
        }
    }, [getAccountInfo]);

    React.useEffect(() => {
        return () => {
            $payout.set(null);
            $email.set('');
            $requisites.set('');
            setError('');
        };
    }, []);

    return {
        isLoading, isLoadingTargetCurrency, getExchangeCourse, setSourceCurrency, setTargetCurrency, handleChangeCurrencies, error, setError
    };
};
