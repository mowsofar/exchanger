import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { ExchangeDirection, ExchangeDirectionsStatusValues, StatusType } from '../../api/types/common';
import { IconChevronCircleRightOutline } from '@salutejs/plasma-icons';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';
import { formatCalculatorInput, formatToSubmit } from '../../utils/formatNumber';

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
    const [profitPercent, setProfitPercent] = React.useState<string | undefined>(
        formatCalculatorInput(exchangeDirection?.profitPercent),
    );
    const [minSourceAmount, setMinSourceAmount] = React.useState<string | undefined>(
        formatCalculatorInput(exchangeDirection?.minSourceAmount),
    );
    const [maxSourceAmount, setMaxSourceAmount] = React.useState<string | undefined>(
        formatCalculatorInput(exchangeDirection?.maxSourceAmount),
    );
    const [reserves, setReserves] = React.useState<string | undefined>(
        formatCalculatorInput(exchangeDirection?.reserves),
    );

    const [status, setStatus] = React.useState<StatusType>(exchangeDirection?.status);

    const onCloseModal = () => {
        setProfitPercent(undefined);
        setMinSourceAmount(undefined);
        setMaxSourceAmount(undefined);
        setReserves(undefined);

        onClose();
    };

    const handleSubmit = () => {
        const newData: any = {};

        if (profitPercent && profitPercent !== formatCalculatorInput(exchangeDirection?.profitPercent)) {
            newData.profitPercent = formatToSubmit(profitPercent);
        }

        if (minSourceAmount && minSourceAmount !== formatCalculatorInput(exchangeDirection?.minSourceAmount)) {
            newData.minSourceAmount = formatToSubmit(minSourceAmount);
        }

        if (maxSourceAmount && maxSourceAmount !== formatCalculatorInput(exchangeDirection.maxSourceAmount)) {
            newData.maxSourceAmount = formatToSubmit(maxSourceAmount);
        }

        if (reserves && reserves !== formatCalculatorInput(exchangeDirection?.reserves)) {
            newData.reserves = formatToSubmit(reserves);
        }

        if (status && status !== exchangeDirection?.status) {
            newData.status = status;
        }

        editExchangeDirectionItem(exchangeDirection.id, newData);
        onCloseModal();
    };

    const handleChangeProfitPercent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfitPercent(formatCalculatorInput(e.target.value));
    };

    const handleChangeMinAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinSourceAmount(formatCalculatorInput(e.target.value));
    };

    const handleChangeMaxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSourceAmount(formatCalculatorInput(e.target.value));
    };

    const handleChangeReserves = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReserves(formatCalculatorInput(e.target.value));
    };

    const handleChangeStatus = (value: StatusType) => {
        setStatus(value);
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

                <Select
                    label="Статус"
                    items={ExchangeDirectionsStatusValues}
                    value={exchangeDirection?.status}
                    onChange={(value) => handleChangeStatus(value as StatusType)}
                    size="l"
                />

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
