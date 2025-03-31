import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { ExchangeDirection } from '../../api/types/common';
import { IconChevronCircleRightOutline } from '@salutejs/plasma-icons';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';

interface EditExchangeDirectionModalProps {
    exchangeDirection: ExchangeDirection;
    opened: boolean;
    onClose: () => void;
    editExchangeDirectionItem: (id: number, body: any) => void;
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

export const EditExchangeDirectionModal: React.FC<EditExchangeDirectionModalProps> = ({
    exchangeDirection,
    opened,
    onClose,
    editExchangeDirectionItem,
}) => {
    const [profitPercent, setProfitPercent] = React.useState<number | undefined>(exchangeDirection.profitPercent);
    const [minSourceAmount, setMinSourceAmount] = React.useState<number | undefined>(exchangeDirection.minSourceAmount);
    const [maxSourceAmount, setMaxSourceAmount] = React.useState<number | undefined>(exchangeDirection.maxSourceAmount);
    const [reserves, setReserves] = React.useState<number | undefined>(exchangeDirection.reserves);

    const onCloseModal = () => {
        setProfitPercent(undefined);
        setMinSourceAmount(undefined);
        setMaxSourceAmount(undefined);
        setReserves(undefined);

        onClose();
    };

    const handleSubmit = () => {
        const newData: any = {};

        if (profitPercent !== exchangeDirection?.profitPercent) {
            newData.profitPercent = profitPercent;
        }

        if (minSourceAmount !== exchangeDirection?.minSourceAmount) {
            newData.minSourceAmount = minSourceAmount;
        }

        if (maxSourceAmount !== exchangeDirection.maxSourceAmount) {
            newData.maxSourceAmount = maxSourceAmount;
        }

        if (reserves !== exchangeDirection?.reserves) {
            newData.reserves = reserves;
        }

        editExchangeDirectionItem(exchangeDirection.id, newData);
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
            <Headline3>Редактировать направление</Headline3>
            <Content>
                <TwoColumns>
                    <Select
                        label="Валюта для отдаю"
                        items={[
                            {
                                value: String(exchangeDirection.sourceCurrency.id),
                                label: `${exchangeDirection.sourceCurrency.paymentSystem.name} ${exchangeDirection.sourceCurrency.currencyCode.code}`,
                            },
                        ]}
                        value={String(exchangeDirection.sourceCurrency.id)}
                        disabled
                        size="l"
                    />

                    <StyledArrow />

                    <Select
                        label="Валюта для получаю"
                        items={[
                            {
                                value: String(exchangeDirection.targetCurrency.id),
                                label: `${exchangeDirection.targetCurrency.paymentSystem.name} ${exchangeDirection.targetCurrency.currencyCode.code}`,
                            },
                        ]}
                        value={String(exchangeDirection.targetCurrency.id)}
                        disabled
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
                    text="Изменить"
                    stretch
                    onClick={handleSubmit}
                    disabled={!profitPercent || !minSourceAmount || !maxSourceAmount || !reserves}
                    onKeyDown={handleSubmit}
                />
            </Content>
        </StyledModal>
    );
};
