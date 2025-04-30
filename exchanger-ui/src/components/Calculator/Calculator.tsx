import {
    ExchangeInfo,
    InputContainer,
    Skeleton,
    SpinnerWrapper,
    StyledCard,
    StyledCardName,
    StyledError,
    StyledIcon,
    StyledInput,
    StyledRoot,
    StyledSelect,
    StyledSpinner,
    SwapButton,
} from './Calculator.styled';
import { useStore } from '@nanostores/react';
import {
    $amountFrom,
    $amountTo,
    $course,
    $currencyType,
    $exchangeDirection,
    $exchangeError,
    $sourceCurrency,
    $targetCurrency,
} from '../../stores/currencies.store';
import React from 'react';
import { Currency } from '../../api/types/common';
import {
    formatCalculatorInput,
    formatInputWithDecimalPlaces,
    formatNumber,
    formatNumberWithDecimalPlaces,
    formatToSubmit,
} from '../../utils/formatNumber';

interface Props {
    isLoading: boolean;
    isLoadingTargetCurrency: boolean;
    handleClickSourceCurrency: () => void;
    handleClickTargetCurrency: () => void;
    handleChangeCurrencies: (sourceCurrency: Currency, targetCurrency: Currency) => void;
    error: string;
    setError: (error: string) => void;
}

export const Calculator: React.FC<Props> = ({
    isLoading,
    isLoadingTargetCurrency,
    handleClickSourceCurrency,
    handleClickTargetCurrency,
    handleChangeCurrencies,
    error,
    setError,
}) => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);
    const amountFrom = formatCalculatorInput(useStore($amountFrom));
    const amountTo = formatCalculatorInput(useStore($amountTo));

    const exchangeDirection = useStore($exchangeDirection);

    const onClickSourceCurrency = () => {
        $currencyType.set('source');
        handleClickSourceCurrency();
    };

    const onClickTargetCurrency = () => {
        $currencyType.set('target');
        handleClickTargetCurrency();
    };

    const handleChangeSourceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        let inputValue = e.target.value;

        // Форматируем ввод с учетом decimalPlaces
        const formattedValue = formatInputWithDecimalPlaces(inputValue, sourceCurrency?.decimalPlaces);
        $amountFrom.set(formattedValue);

        if (course) {
            const numericValue = formatToSubmit(formattedValue);
            let calculatedAmount: number;

            if (course.isReversed) {
                calculatedAmount = numericValue / course.course;
            } else {
                calculatedAmount = numericValue * course.course;
            }

            // Форматируем результат с учетом decimalPlaces целевой валюты
            $amountTo.set(formatNumberWithDecimalPlaces(calculatedAmount, targetCurrency?.decimalPlaces));
        }

        // Проверка лимитов
        const numericValue = formatToSubmit(formattedValue);
        if (
            exchangeDirection?.minSourceAmount &&
            exchangeDirection?.maxSourceAmount &&
            (numericValue < exchangeDirection?.minSourceAmount || numericValue > exchangeDirection?.maxSourceAmount)
        ) {
            $exchangeError.set(true);
        } else {
            $exchangeError.set(false);
        }
    };

    const handleChangeTargetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        let inputValue = e.target.value;

        // Форматируем ввод с учетом decimalPlaces
        const formattedValue = formatInputWithDecimalPlaces(inputValue, targetCurrency?.decimalPlaces);
        $amountTo.set(formattedValue);

        let sourceAmount = 0;

        if (course) {
            const numericValue = formatToSubmit(formattedValue);
            let calculatedAmount: number;

            if (course.isReversed) {
                calculatedAmount = numericValue * course.course;
                sourceAmount = calculatedAmount;
            } else {
                calculatedAmount = numericValue / course.course;
                sourceAmount = calculatedAmount;
            }

            // Форматируем результат с учетом decimalPlaces исходной валюты
            $amountFrom.set(formatNumberWithDecimalPlaces(calculatedAmount, sourceCurrency?.decimalPlaces));
        }

        // Проверка лимитов
        if (
            exchangeDirection?.minSourceAmount &&
            exchangeDirection?.maxSourceAmount &&
            (sourceAmount < exchangeDirection?.minSourceAmount || sourceAmount > exchangeDirection?.maxSourceAmount)
        ) {
            $exchangeError.set(true);
        } else {
            $exchangeError.set(false);
        }
    };

    const onChangeCurrencies = () => {
        if (sourceCurrency && targetCurrency) {
            handleChangeCurrencies(sourceCurrency, targetCurrency);
        }
    };

    return (
        <>
            <ExchangeInfo>
                {exchangeDirection?.minSourceAmount && (
                    <div>
                        Мин: {formatNumber(exchangeDirection?.minSourceAmount, sourceCurrency?.decimalPlaces)}{' '}
                        {sourceCurrency?.currencyCode.code}
                    </div>
                )}

                {exchangeDirection?.maxSourceAmount && (
                    <div>
                        Макс: {formatNumber(exchangeDirection?.maxSourceAmount, sourceCurrency?.decimalPlaces)}{' '}
                        {sourceCurrency?.currencyCode.code}
                    </div>
                )}
            </ExchangeInfo>
            <StyledRoot>
                <SwapButton onClick={() => onChangeCurrencies()}>
                    {(Boolean(isLoading) || Boolean(isLoadingTargetCurrency)) && (
                        <SpinnerWrapper>
                            <StyledSpinner size={32} />
                        </SpinnerWrapper>
                    )}

                    {!Boolean(isLoading) && !Boolean(isLoadingTargetCurrency) && <StyledIcon />}
                </SwapButton>
                <StyledCard>
                    <StyledCardName>Отдаёте</StyledCardName>
                    <InputContainer>
                        {Boolean(isLoading) && <Skeleton />}
                        {Boolean(!isLoading) && <StyledInput value={amountFrom} onChange={handleChangeSourceAmount} />}

                        <StyledSelect
                            isLoading={isLoading}
                            contentLeft={sourceCurrency?.paymentSystem.imagePath}
                            onClick={onClickSourceCurrency}
                        >
                            {`${sourceCurrency?.paymentSystem.name} ${sourceCurrency?.currencyCode.code}`}
                        </StyledSelect>
                    </InputContainer>
                </StyledCard>

                <StyledCard>
                    <StyledCardName>Получаете</StyledCardName>
                    <InputContainer>
                        {Boolean(isLoading) && <Skeleton />}
                        {Boolean(!isLoading) && <StyledInput value={amountTo} onChange={handleChangeTargetAmount} />}

                        <StyledSelect
                            isLoading={isLoadingTargetCurrency || isLoading}
                            contentLeft={targetCurrency?.paymentSystem.imagePath}
                            onClick={onClickTargetCurrency}
                        >
                            {`${targetCurrency?.paymentSystem.name} ${targetCurrency?.currencyCode.code}`}
                        </StyledSelect>
                    </InputContainer>
                </StyledCard>
            </StyledRoot>
            {error && <StyledError>{error}</StyledError>}
        </>
    );
};
