import { IconSwapVert } from '@salutejs/plasma-icons';
import {
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
    $exchangeDirections,
    $exchangeError,
    $sourceCurrency,
    $targetCurrency,
} from '../../stores/currencies.store';
import React from 'react';
import { Currency } from '../../api/types/common';

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
    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);
    const course = useStore($course);
    const exchangeDirection = useStore($exchangeDirections);

    if (course?.course) {
        if (course.isReversed) {
            $amountTo.set(amountFrom / course.course);
        } else {
            $amountTo.set(amountFrom * course.course);
        }
    }

    const onClickSourceCurrency = () => {
        $currencyType.set('source');
        handleClickSourceCurrency();
    };

    const onClickTargetCurrency = () => {
        $currencyType.set('target');
        handleClickTargetCurrency();
    };

    const handleChangeSourceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        $amountFrom.set(Number(e.target.value));
        setError('');

        if (course) {
            $amountTo.set(Number(e.target.value) / course.course);
        }

        if (
            exchangeDirection?.minSourceAmount &&
            exchangeDirection?.maxSourceAmount &&
            (Number(e.target.value) < exchangeDirection?.minSourceAmount ||
                Number(e.target.value) > exchangeDirection?.maxSourceAmount)
        ) {
            $exchangeError.set(true);
        } else {
            $exchangeError.set(false);
        }
    };

    const handleChangeTargetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        $amountTo.set(Number(e.target.value));

        if (course) {
            $amountFrom.set(Number(e.target.value) * course.course);
        }
    };

    const onChangeCurrencies = () => {
        if (sourceCurrency && targetCurrency) {
            handleChangeCurrencies(sourceCurrency, targetCurrency);
        }
    };

    return (
        <>
            <StyledRoot>
                <SwapButton onClick={() => onChangeCurrencies()}>
                    <StyledIcon />
                </SwapButton>
                <StyledCard>
                    <StyledCardName>Отдаёте</StyledCardName>
                    <InputContainer>
                        <StyledInput type="number" value={amountFrom} onChange={handleChangeSourceAmount} />
                        <StyledSelect
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
                        <StyledInput type="number" value={amountTo} onChange={handleChangeTargetAmount} />
                        <StyledSelect
                            contentLeft={targetCurrency?.paymentSystem.imagePath}
                            onClick={onClickTargetCurrency}
                        >
                            {`${targetCurrency?.paymentSystem.name} ${targetCurrency?.currencyCode.code}`}
                        </StyledSelect>
                    </InputContainer>
                </StyledCard>
            </StyledRoot>
            <StyledError>
                Минимальная сумма обмена - {exchangeDirection?.minSourceAmount} {sourceCurrency?.currencyCode.code} и
                максимальная - {exchangeDirection?.maxSourceAmount} {sourceCurrency?.currencyCode.code}
            </StyledError>
            {error && <StyledError>{error}</StyledError>}
        </>
    );
};
