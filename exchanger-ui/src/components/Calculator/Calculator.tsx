import { IconSwapVert } from '@salutejs/plasma-icons';
import {
    InputContainer,
    StyledCard,
    StyledCardName,
    StyledError,
    StyledInput,
    StyledRoot,
    SwapButton,
} from './Calculator.styled';
import { Select } from '../Select/Select';
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
    const course = useStore($course);
    const exchangeDirection = useStore($exchangeDirections);
    const exchangeError = useStore($exchangeError);

    if (course?.course) {
        if (course.isReversed) {
            $amountTo.set(amountFrom / course.course);
        } else {
            $amountTo.set(amountFrom * course.course);
        }
    }

    const amountTo = useStore($amountTo);

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
            $exchangeError.set(
                `Минимальная сумма обмена - ${exchangeDirection?.minSourceAmount} ${sourceCurrency?.currencyCode.code} и максимальная - ${exchangeDirection?.maxSourceAmount} ${sourceCurrency?.currencyCode.code}`,
            );
        } else {
            $exchangeError.set('');
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
        <StyledRoot>
            <SwapButton onClick={() => onChangeCurrencies()}>
                <IconSwapVert />
            </SwapButton>
            <StyledCard>
                <StyledCardName>Отдаёте</StyledCardName>
                <InputContainer>
                    <StyledInput type="number" value={amountFrom} onChange={handleChangeSourceAmount} />
                    <Select contentLeft={sourceCurrency?.paymentSystem.imagePath} onClick={onClickSourceCurrency}>
                        {`${sourceCurrency?.paymentSystem.name} ${sourceCurrency?.currencyCode.code}`}
                    </Select>
                </InputContainer>
            </StyledCard>

            <StyledCard>
                <StyledCardName>Получаете</StyledCardName>
                <InputContainer>
                    <StyledInput type="number" value={amountTo} onChange={handleChangeTargetAmount} />
                    <Select contentLeft={targetCurrency?.paymentSystem.imagePath} onClick={onClickTargetCurrency}>
                        {`${targetCurrency?.paymentSystem.name} ${targetCurrency?.currencyCode.code}`}
                    </Select>
                </InputContainer>
            </StyledCard>

            {exchangeError && <StyledError>{exchangeError}</StyledError>}
            {error && <StyledError>{error}</StyledError>}
        </StyledRoot>
    );
};
