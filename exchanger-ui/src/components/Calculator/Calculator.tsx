import {
    ExchangeInfo,
    InputContainer,
    StyledCard,
    StyledCardName,
    StyledError,
    StyledIcon,
    StyledInput,
    StyledRoot,
    StyledSelect,
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
import { formatCalculatorInput, formatNumber, formatToSubmit } from '../../utils/formatNumber';

interface Props {
    handleClickSourceCurrency: () => void;
    handleClickTargetCurrency: () => void;
    handleChangeCurrencies: (sourceCurrency: Currency, targetCurrency: Currency) => void;
    error: string;
    setError: (error: string) => void;
}

export const Calculator: React.FC<Props> = ({
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

        $amountFrom.set(formatCalculatorInput(inputValue));

        if (course) {
            if (course.isReversed) {
                $amountTo.set(formatCalculatorInput(formatToSubmit(inputValue) / course.course));
            } else {
                $amountTo.set(formatCalculatorInput(formatToSubmit(inputValue) * course.course));
            }
        }

        if (
            exchangeDirection?.minSourceAmount &&
            exchangeDirection?.maxSourceAmount &&
            (formatToSubmit(inputValue) < exchangeDirection?.minSourceAmount ||
                formatToSubmit(inputValue) > exchangeDirection?.maxSourceAmount)
        ) {
            $exchangeError.set(true);
        } else {
            $exchangeError.set(false);
        }
    };

    const handleChangeTargetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        let inputValue = e.target.value;

        $amountTo.set(formatCalculatorInput(inputValue));

        let sourceAmount = 0;

        if (course) {
            if (course.isReversed) {
                $amountFrom.set(formatCalculatorInput(formatToSubmit(inputValue) * course.course));
                sourceAmount = formatToSubmit(inputValue) * course.course;
            } else {
                $amountFrom.set(formatCalculatorInput(formatToSubmit(inputValue) / course.course));
                sourceAmount = formatToSubmit(inputValue) / course.course;
            }
        }

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
                <div>
                    Мин: {formatNumber(exchangeDirection?.minSourceAmount)} {sourceCurrency?.currencyCode.code}
                </div>
                <div>
                    Макс: {formatNumber(exchangeDirection?.maxSourceAmount)} {sourceCurrency?.currencyCode.code}
                </div>
            </ExchangeInfo>
            <StyledRoot>
                <SwapButton onClick={() => onChangeCurrencies()}>
                    <StyledIcon />
                </SwapButton>
                <StyledCard>
                    <StyledCardName>Отдаёте</StyledCardName>
                    <InputContainer>
                        <StyledInput value={amountFrom} onChange={handleChangeSourceAmount} />
                        {sourceCurrency && (
                            <StyledSelect
                                contentLeft={sourceCurrency?.paymentSystem.imagePath}
                                onClick={onClickSourceCurrency}
                            >
                                {`${sourceCurrency?.paymentSystem.name} ${sourceCurrency?.currencyCode.code}`}
                            </StyledSelect>
                        )}
                    </InputContainer>
                </StyledCard>

                <StyledCard>
                    <StyledCardName>Получаете</StyledCardName>
                    <InputContainer>
                        <StyledInput value={amountTo} onChange={handleChangeTargetAmount} />
                        {targetCurrency && (
                            <StyledSelect
                                contentLeft={targetCurrency?.paymentSystem.imagePath}
                                onClick={onClickTargetCurrency}
                            >
                                {`${targetCurrency?.paymentSystem.name} ${targetCurrency?.currencyCode.code}`}
                            </StyledSelect>
                        )}
                    </InputContainer>
                </StyledCard>
            </StyledRoot>
            {error && <StyledError>{error}</StyledError>}
        </>
    );
};
