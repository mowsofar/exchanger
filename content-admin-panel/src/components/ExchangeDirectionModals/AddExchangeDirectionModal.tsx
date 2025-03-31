import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { IconChevronCircleRightOutline } from '@salutejs/plasma-icons';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';

interface AddExchangeDirectionModalProps {
    opened: boolean;
    onClose: () => void;
    createExchangeDirection: (
        sourceCurrencyId: number,
        targetCurrencyId: number,
        profitPercent: number,
        minSourceAmount: number,
        maxSourceAmount: number,
        reserves: number,
    ) => void;
}

const StyledModal = styled(Modal)`
    width: 600px;
`;

const TwoColumns = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: end;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    > div > div {
        font-weight: 550;
    }
`;

const StyledTextField = styled(TextFieldGrey)`
    width: 100%;

    & label {
        font-weight: 550 !important;
    }
`;

const StyledArrow = styled(IconChevronCircleRightOutline)`
    padding-bottom: 20px;
`;

export const AddExchangeDirectionModal: React.FC<AddExchangeDirectionModalProps> = ({
    opened,
    onClose,
    createExchangeDirection,
}) => {
    const [selectedSourceCurrencyId, setSelectedSourceCurrencyId] = React.useState<number>();
    const [selectedTargetCurrencyId, setSelectedTargetCurrencyId] = React.useState<number>();
    const [profitPercent, setProfitPercent] = React.useState<number>();
    const [minSourceAmount, setMinSourceAmount] = React.useState<number>();
    const [maxSourceAmount, setMaxSourceAmount] = React.useState<number>();
    const [reserves, setReserves] = React.useState<number>();

    const currencyList = useStore($currencyList);

    const currencyOptions = currencyList.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const onCloseModal = () => {
        setSelectedSourceCurrencyId(undefined);
        setSelectedTargetCurrencyId(undefined);
        setProfitPercent(undefined);
        setMinSourceAmount(undefined);
        setMaxSourceAmount(undefined);
        setReserves(undefined);
        onClose();
    };

    const handleSubmit = () => {
        if (
            selectedSourceCurrencyId &&
            selectedTargetCurrencyId &&
            profitPercent &&
            minSourceAmount &&
            maxSourceAmount &&
            reserves
        ) {
            createExchangeDirection(
                selectedSourceCurrencyId,
                selectedTargetCurrencyId,
                profitPercent,
                minSourceAmount,
                maxSourceAmount,
                reserves,
            );
        }

        onCloseModal();
    };

    const handleChangeProfitPercent = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return;
        }

        setProfitPercent(Number(e.target.value));
    };

    const handleChangeMinAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return;
        }

        setMinSourceAmount(Number(e.target.value));
    };

    const handleChangeMaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return;
        }

        setMaxSourceAmount(Number(e.target.value));
    };

    const handleChangeReserves = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return;
        }

        setReserves(Number(e.target.value));
    };

    return (
        <StyledModal opened={opened} onClose={onCloseModal}>
            <Headline3>Добавить направление</Headline3>
            <Content>
                <TwoColumns>
                    <Select
                        label="Выберите валюту для отдаю"
                        items={currencyOptions}
                        value={selectedSourceCurrencyId}
                        onChange={(value) => setSelectedSourceCurrencyId(value as number)}
                        size="l"
                    />

                    <StyledArrow />

                    <Select
                        label="Выберите валюту для получаю"
                        items={currencyOptions}
                        value={selectedTargetCurrencyId}
                        onChange={(value) => setSelectedTargetCurrencyId(value as number)}
                        size="l"
                    />
                </TwoColumns>

                <StyledTextField label="Процент прибыли" value={profitPercent} onChange={handleChangeProfitPercent} />

                <TwoColumns>
                    <StyledTextField
                        label="Минимальная сумма обмена"
                        value={minSourceAmount}
                        onChange={handleChangeMinAmount}
                    />

                    <StyledTextField
                        label="Максимальная сумма обмена"
                        value={maxSourceAmount}
                        onChange={handleChangeMaxAmount}
                    />
                </TwoColumns>

                <StyledTextField label="Резервы" value={reserves} onChange={handleChangeReserves} />

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    disabled={
                        !selectedSourceCurrencyId ||
                        !selectedTargetCurrencyId ||
                        !profitPercent ||
                        !minSourceAmount ||
                        !maxSourceAmount ||
                        !reserves
                    }
                    onKeyDown={handleSubmit}
                />
            </Content>
        </StyledModal>
    );
};
