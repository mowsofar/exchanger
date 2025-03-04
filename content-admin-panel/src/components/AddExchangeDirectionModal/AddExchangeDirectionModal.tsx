import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { IconChevronCircleRightOutline } from '@salutejs/plasma-icons';

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

const StyledTextField = styled(TextField)`
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

    return (
        <StyledModal opened={opened} onClose={onCloseModal}>
            <Headline3>Добавить направление</Headline3>
            <Content>
                <TwoColumns>
                    <Select
                        label="Выберите валюту для отдаю"
                        items={currencyOptions}
                        value={selectedSourceCurrencyId}
                        onChange={setSelectedSourceCurrencyId}
                        size="l"
                    />

                    <StyledArrow />

                    <Select
                        label="Выберите валюту для получаю"
                        items={currencyOptions}
                        value={selectedTargetCurrencyId}
                        onChange={setSelectedTargetCurrencyId}
                        size="l"
                    />
                </TwoColumns>

                <StyledTextField
                    label="Процент прибыли"
                    type="number"
                    value={profitPercent}
                    onChange={(e) => setProfitPercent(Number(e.target.value))}
                />

                <TwoColumns>
                    <StyledTextField
                        label="Минимальная сумма обмена"
                        type="number"
                        value={minSourceAmount}
                        onChange={(e) => setMinSourceAmount(Number(e.target.value))}
                    />

                    <StyledTextField
                        label="Максимальная сумма обмена"
                        type="number"
                        value={maxSourceAmount}
                        onChange={(e) => setMaxSourceAmount(Number(e.target.value))}
                    />
                </TwoColumns>

                <StyledTextField
                    label="Резервы"
                    type="number"
                    value={reserves}
                    onChange={(e) => setReserves(Number(e.target.value))}
                />

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
